const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS middleware
const mediasoup = require('mediasoup');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins (or specify your frontend URL)
        methods: ["GET", "POST"]
    }
});

// Serve static files (React build folder)
app.use(cors()); // Enable CORS for all routes
app.use(express.static('public'));

let worker;
let router;
let producers = {};
let consumers = {};

(async () => {
    // Create a mediasoup worker
    worker = await mediasoup.createWorker();

    // Create a mediasoup router
    const mediaCodecs = [
        {
            kind: 'audio',
            mimeType: 'audio/opus',
            clockRate: 48000,
            channels: 2,
        },
        {
            kind: 'video',
            mimeType: 'video/VP8',
            clockRate: 90000,
        },
    ];
    router = await worker.createRouter({ mediaCodecs });

    console.log('Mediasoup router created');
})();

io.on('connection', async (socket) => {
    console.log('A user connected:', socket.id);

    // Handle broadcaster joining
    socket.on('broadcaster', async (data) => {
        if (!data || !data.rtpCapabilities) {
            console.error('Invalid broadcaster event: Missing rtpCapabilities');
            return;
        }

        const { rtpCapabilities } = data;

        console.log('Broadcaster connected:', socket.id);

        // Send router RTP capabilities to the broadcaster
        socket.emit('routerRtpCapabilities', router.rtpCapabilities);

        // Create a producer transport for the broadcaster
        const transport = await createTransport(socket, 'producer');
        producers[socket.id] = { transport };

        // Handle producer creation
        socket.on('produce', async ({ kind, rtpParameters }) => {
            const producer = await transport.produce({ kind, rtpParameters });
            producers[socket.id].producer = producer;

            // Notify the broadcaster of the producer ID
            socket.emit('producerId', producer.id);

            // Forward the producer to all viewers
            for (const viewerId in consumers) {
                const consumerTransport = consumers[viewerId].transport;
                await createConsumer(consumerTransport, producer, viewerId);
            }
        });

        // Handle end stream event
        socket.on('endStream', () => {
            console.log('Broadcaster ended the stream:', socket.id);

            // Close the producer transport
            if (producers[socket.id]?.transport) {
                producers[socket.id].transport.close();
            }

            // Notify all viewers that the stream has ended
            io.emit('streamEnded');

            // Clean up resources
            delete producers[socket.id];
        });
    });

    // Handle viewer joining
    socket.on('viewer', async (data) => {
        if (!data || !data.rtpCapabilities) {
            console.error('Invalid viewer event: Missing rtpCapabilities');
            return;
        }

        const { rtpCapabilities } = data;

        console.log('Viewer connected:', socket.id);

        // Check if the viewer can consume the broadcaster's stream
        if (!router.canConsume({ producerId: Object.values(producers)[0]?.producer.id, rtpCapabilities })) {
            return socket.emit('error', 'Cannot consume');
        }

        // Create a consumer transport for the viewer
        const transport = await createTransport(socket, 'consumer');
        consumers[socket.id] = { transport };

        // Consume the broadcaster's stream
        for (const broadcasterId in producers) {
            const producer = producers[broadcasterId].producer;
            await createConsumer(transport, producer, socket.id);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete producers[socket.id];
        delete consumers[socket.id];
    });
});

async function createTransport(socket, type) {
    const transport = await router.createWebRtcTransport({
        listenIps: [{ ip: '127.0.0.1', announcedIp: null }],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
    });

    // Send transport parameters to the client
    socket.emit(`${type}TransportParameters`, {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
    });

    // Handle DTLS parameters from the client
    socket.once('connectTransport', async ({ transportId, dtlsParameters }) => {
        if (transport.id === transportId) {
            await transport.connect({ dtlsParameters });
        }
    });

    return transport;
}

async function createConsumer(transport, producer, viewerId) {
    const consumer = await transport.consume({
        producerId: producer.id,
        rtpCapabilities: router.rtpCapabilities,
        paused: true,
    });

    // Send consumer parameters to the viewer
    io.to(viewerId).emit('newConsumer', {
        producerId: producer.id,
        id: consumer.id,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        type: consumer.type,
    });

    // Resume the consumer once the viewer is ready
    io.to(viewerId).on('resumeConsumer', async ({ consumerId }) => {
        if (consumer.id === consumerId) {
            await consumer.resume();
        }
    });
}

server.listen(3000, () => {
    console.log('SFU server running on port 3000');
});