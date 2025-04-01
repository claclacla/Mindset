import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { WEBSOCKET } from "../../../config.json";

import { RootState } from "@/app/repositories/store";

import { TrainingSession } from "@/app/entities/TrainingSession";
import mapObjectToTrainingSession from "@/app/mappers/mapObjectToTrainingSession";

function isTrainingSessionNew({ trainingSessions, newTrainingSession }: {
    trainingSessions: TrainingSession[],
    newTrainingSession: TrainingSession
}): boolean {
    let isNew: boolean = true;

    trainingSessions.map((trainingSession: TrainingSession) => {
        if (trainingSession.id === newTrainingSession.id) {
            isNew = false;
        }
    });

    return isNew;
}

export default function useNewTrainingSessionWebSocket() {
    const trainingSessions: TrainingSession[] = useSelector((state: RootState) => state.trainingSessions.list);

    const [trainingSession, setTrainingSession] = useState<TrainingSession | undefined>(undefined);

    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const connectWebSocket = () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                console.log("WebSocket is already connected");
                return;
            }

            console.log("Connecting to WebSocket...");
            ws.current = new WebSocket(WEBSOCKET.ADDRESS);

            ws.current.onopen = () => {
                console.log("Connected to WebSocket server");
                setIsConnected(true);
            };

            ws.current.onmessage = (event) => {
                console.log("Received:", event.data);

                try {
                    const obj: any = JSON.parse(event.data);
                    const newTrainingSession: TrainingSession = mapObjectToTrainingSession(obj);

                    console.log(trainingSessions);
                    if (isTrainingSessionNew({ trainingSessions, newTrainingSession })) {
                        setTrainingSession(newTrainingSession);
                    }
                } catch (error) {
                    console.error("Error parsing message:", error);
                }
            };

            ws.current.onerror = (error) => {
                //console.error("WebSocket Error:", error);
            };

            ws.current.onclose = () => {
                setIsConnected(false);
                console.log("Disconnected from the WebSocket server");
            };
        };

        connectWebSocket();

        return () => {
            if (ws.current) {
                console.log("Cleaning up WebSocket...");
                setIsConnected(false);
                ws.current.close();
            }
        };
    }, [trainingSessions]);

    return { trainingSession };
}