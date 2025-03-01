import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';

const socket = io('http://localhost:3000', {
    transports: ['websocket'], // Force WebSocket transport
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Retry up to 5 times
    reconnectionDelay: 1000, // Wait 1 second between retries
});

const Broadcaster = () => {
    const localVideoRef = useRef(null);
    const [device, setDevice] = useState(null);
    const [stream, setStream] = useState(null);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                setStream(stream);

                const initDevice = async () => {
                    const device = new Device();
                    try {
                        await device.load({ routerRtpCapabilities: await new Promise(resolve => {
                            socket.on('routerRtpCapabilities', resolve);
                            socket.emit('broadcaster', { rtpCapabilities: device.rtpCapabilities });
                        }) });
                        console.log('Device loaded successfully:', device.rtpCapabilities);
                        setDevice(device);
                    } catch (error) {
                        console.error('Failed to load mediasoup device:', error);
                    }
                };

                initDevice();
            });
    }, []);

    const startBroadcast = async () => {
        if (!device || !stream) return;

        const transport = device.createSendTransport(await new Promise(resolve => {
            socket.on('producerTransportParameters', resolve);
        }));
        transport.on('connect', ({ dtlsParameters }, callback, errback) => {
            socket.emit('connectTransport', { transportId: transport.id, dtlsParameters });
            callback();
        });

        transport.produce({ track: stream.getAudioTracks()[0], kind: 'audio' });
        transport.produce({ track: stream.getVideoTracks()[0], kind: 'video' });

        setIsBroadcasting(true);
    };

    const endStream = () => {
        stream.getTracks().forEach(track => track.stop());
        setIsBroadcasting(false);
        socket.emit('endStream');
    };

    const toggleAudio = () => {
        const audioTrack = stream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
    };

    const toggleVideo = () => {
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
    };

    return (
        <div>
            <h1>Broadcaster</h1>
            <video ref={localVideoRef} autoPlay muted style={{ width: '50%' }} />
            <div style={{ marginTop: '20px' }}>
                {!isBroadcasting ? (
                    <button onClick={startBroadcast}>Start Broadcast</button>
                ) : (
                    <>
                        <button onClick={endStream}>End Stream</button>
                        <button onClick={toggleAudio} style={{ marginLeft: '10px' }}>
                            {audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
                        </button>
                        <button onClick={toggleVideo} style={{ marginLeft: '10px' }}>
                            {videoEnabled ? 'Turn Off Video' : 'Turn On Video'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Broadcaster;