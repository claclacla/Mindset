import { useEffect, useState } from "react";

import { WEBSOCKET } from "../../../config.json";

import { TrainingSession } from "@/app/entities/TrainingSession";
import mapObjectToTrainingSession from "@/app/mappers/mapObjectToTrainingSession";

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

            ws.onmessage = (event) => {
                //console.log("Received:", event.data);

                try {
                    const obj: any = JSON.parse(event.data);
                    const trainingSession: TrainingSession = mapObjectToTrainingSession(obj);
                    
                    setTrainingSession(trainingSession);
                }
                catch(error) {

                }
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
