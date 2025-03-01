import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';

const socket = io('http://localhost:3000', {
    transports: ['websocket'], // Force WebSocket transport
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Retry up to 5 times
    reconnectionDelay: 1000, // Wait 1 second between retries
});

const Viewer = () => {
    const remoteVideoRef = useRef(null);
    const [device, setDevice] = useState(null);
    const [currentQuality, setCurrentQuality] = useState('auto'); // 'auto', '360p', '720p', '1080p'
    const [isPaused, setIsPaused] = useState(false);
    const [streamEnded, setStreamEnded] = useState(false);

    useEffect(() => {
        const initDevice = async () => {
            const device = new Device();
            try {
                console.log('Waiting for routerRtpCapabilities...');
                const routerRtpCapabilities = await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        reject(new Error('Timeout waiting for routerRtpCapabilities'));
                    }, 5000); // Timeout after 5 seconds

                    socket.on('routerRtpCapabilities', (capabilities) => {
                        clearTimeout(timeout);
                        console.log('Received routerRtpCapabilities:', capabilities);
                        resolve(capabilities);
                    });
                    socket.emit('viewer'); // Notify the server that a viewer has connected
                });

                console.log('Loading mediasoup device...');
                await device.load({ routerRtpCapabilities });
                console.log('Device loaded successfully:', device.rtpCapabilities);
                setDevice(device);
            } catch (error) {
                console.error('Failed to load mediasoup device:', error);
            }

            const transport = device.createRecvTransport(await new Promise(resolve => {
                socket.on('consumerTransportParameters', resolve);
            }));
            transport.on('connect', ({ dtlsParameters }, callback, errback) => {
                socket.emit('connectTransport', { transportId: transport.id, dtlsParameters });
                callback();
            });

            socket.on('newConsumer', async ({ producerId, id, kind, rtpParameters, type }) => {
                const consumer = await transport.consume({ id, producerId, kind, rtpParameters });
                remoteVideoRef.current.srcObject = new MediaStream([consumer.track]);
                socket.emit('resumeConsumer', { consumerId: id });
            });

            socket.on('streamEnded', () => {
                setStreamEnded(true);
                remoteVideoRef.current.srcObject = null;
            });
        };

        initDevice();
    }, []);

    const toggleQuality = (quality) => {
        setCurrentQuality(quality);
        console.log(`Switching to ${quality}`);
        // Implement quality switching logic here (requires server-side support)
    };

    const togglePlayback = () => {
        const video = remoteVideoRef.current;
        if (isPaused) {
            video.play();
        } else {
            video.pause();
        }
        setIsPaused(!isPaused);
    };

    return (
        <div>
            <h1>Viewer</h1>
            {streamEnded ? (
                <p>The stream has ended.</p>
            ) : (
                <>
                    <video ref={remoteVideoRef} autoPlay style={{ width: '50%' }} />
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={() => toggleQuality('auto')} disabled={currentQuality === 'auto'}>
                            Auto Quality
                        </button>
                        <button onClick={() => toggleQuality('360p')} disabled={currentQuality === '360p'} style={{ marginLeft: '10px' }}>
                            360p
                        </button>
                        <button onClick={() => toggleQuality('720p')} disabled={currentQuality === '720p'} style={{ marginLeft: '10px' }}>
                            720p
                        </button>
                        <button onClick={() => toggleQuality('1080p')} disabled={currentQuality === '1080p'} style={{ marginLeft: '10px' }}>
                            1080p
                        </button>
                        <button onClick={togglePlayback} style={{ marginLeft: '10px' }}>
                            {isPaused ? 'Resume Video' : 'Pause Video'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Viewer;