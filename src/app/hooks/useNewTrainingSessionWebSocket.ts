import { useEffect, useState } from "react";

import { WEBSOCKET } from "../../../config.json";

import { TrainingSession } from "../entities/TrainingSession";

export default function useNewTrainingSessionWebSocket() {
    const [trainingSession, setTrainingSession] = useState<TrainingSession | undefined>(undefined);

    useEffect(() => {
        let ws: WebSocket | null = null;
        let reconnectTimeout: NodeJS.Timeout | null = null; 

        const connectWebSocket = () => {
            ws = new WebSocket(WEBSOCKET.ADDRESS);

            ws.onopen = () => {
                console.log("Connected to WebSocket server");
            };

            // TO DO: Implement the logic to check if the received data are valid

            ws.onmessage = (event) => {
                console.log("Received:", event.data);
                setTrainingSession(JSON.parse(event.data));
            };

            ws.onerror = (error) => {
                //console.error("WebSocket Error:", error);
            };

            ws.onclose = () => {
                reconnectTimeout = setTimeout(connectWebSocket, 3000); // Auto-reconnect after 3 seconds
            };
        };

        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }

            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
        };
    }, []);

    return { trainingSession };
}
