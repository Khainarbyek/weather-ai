"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ripple from "../../public/mic-ripple.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function AudioChat() {
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
    const [error, setError] = useState<string>("");
    const [transcript, setTranscript] = useState<string>("");
    const [isRecording, setIsRecording] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const handleTranscript = (message: any) => {
        if (message.response?.output?.[0]?.content?.[0]?.transcript) {
            setTranscript((prev) => prev + message.response.output[0].content[0].transcript + " ");
        }
    };

    const getWeather = async (output: any) => {
        try {
            const args = JSON.parse(output.arguments);
            const location = args.location;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?location=${location}`);
            const data = await response.json();

            sendFunctionOutput(output.call_id, {
                temperature: data.temperature,
                unit: data.unit,
                location: location,
            });

            sendResponseCreate();
        } catch (err: any) {
            showError(`Error handling weather function: ${err.message}`);
        }
    };

    const handleFunctionCall = (output: any) => {
        if (output?.type === "function_call" && output?.name === "get_weather" && output?.call_id) {
            getWeather(output);
        }
    };

    const handleMessage = (event: MessageEvent) => {
        try {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case "response.done": //  || "function_call_arguments"
                    console.log("Response done:", message);
                    handleTranscript(message);
                    const output = message.response?.output?.[0];
                    if (output) handleFunctionCall(output);
                    break;
                default:
                    console.log("Unhandled message type:", message.type);
            }
        } catch (err: any) {
            showError(`Error processing message: ${err.message}`);
        }
    };

    const setupAudio = async (peerConnection: RTCPeerConnection) => {
        const audioElement = document.createElement("audio");
        audioElement.autoplay = true;

        if (!peerConnection) return;

        peerConnection.ontrack = (event) => {
            audioElement.srcObject = event.streams[0];
        };

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track);
        });
    };

    const setupDataChannel = (peerConnection: RTCPeerConnection) => {
        if (!peerConnection) return;

        const channel = peerConnection.createDataChannel("oai-events");
        setDataChannel(channel);

        channel.onopen = onDataChannelOpen;
        channel.addEventListener("message", handleMessage);
    };

    const sendMessage = (message: any) => {
        if (dataChannel?.readyState === "open") {
            dataChannel?.send(JSON.stringify(message));
        }
    };

    const sendFunctionOutput = (callId: string, data: object) => {
        const responseMessage = {
            type: "conversation.item.create",
            item: {
                type: "function_call_output",
                call_id: callId,
                output: JSON.stringify(data),
            },
        };
        sendMessage(responseMessage);
    };

    const sendResponseCreate = () => {
        sendMessage({ type: "response.create" });
    };

    const onDataChannelOpen = () => {
        console.log("Data channel opened");
    };

    const init = async () => {
        console.log("Initializing...");

        setIsRecording(true);
        try {
            const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`);
            const data = await tokenResponse.json();
            const EPHEMERAL_KEY = data.client_secret.value;

            const pc = new RTCPeerConnection();
            setPeerConnection(pc);

            await setupAudio(pc);
            setupDataChannel(pc);

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            const baseUrl = "https://api.openai.com/v1/realtime";
            const model = "gpt-4o-realtime-preview-2024-12-17";

            const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
                method: "POST",
                body: offer.sdp,
                headers: {
                    Authorization: `Bearer ${EPHEMERAL_KEY}`,
                    "Content-Type": "application/sdp",
                },
            });

            const answer: RTCSessionDescriptionInit = {
                type: "answer",
                sdp: await sdpResponse.text(),
            };
            await pc.setRemoteDescription(answer);

            setIsConnected(true);
            console.log("Connected");
        } catch (err: any) {
            setError(`Error: ${err.message}`);
            console.error("Initialization error:", err);
            console.log("Failed to connect");
            setIsConnected(false);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        setError("");
        peerConnection?.close();
        setPeerConnection(null);

        audioStream?.getTracks().forEach((track) => track.stop());
        setAudioStream(null);

        dataChannel?.close();
        setDataChannel(null);

        console.log("Ready to start");
        setIsConnected(false);
    };

    const showError = (message: string) => setError(message);

    return (
        <div className="relative p-10 bg-black/50 rounded-2xl shadow-xl mx-auto text-center flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mb-8">
                <h2 className="text-2xl font-bold mb-2 text-white">AI Weather Assistant</h2>
                <p className="text-lg text-gray-300">Ask me about the weather in your city</p>
            </div>
            <Lottie animationData={ripple} loop={isRecording} autoplay={isRecording} style={{ width: 200, height: 200 }} className="cursor-pointer"
                onClick={isRecording ? stopRecording : init}
                />

            { (!isConnected && isRecording) && <p className="mt-4 text-gray-600 animate-pulse absolute bottom-4">Connecting...</p>}
            {error && (
                <div id="error" className="error">
                    {error}
                </div>
            )}    
        </div>
    );
}
