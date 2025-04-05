import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { TrainingSession } from "@/app/entities/TrainingSession";
import { RootState } from "@/app/repositories/store";


export default function useShowNewTrainingSessionMessageOnInsert() {
    const trainingSessions: TrainingSession[] = useSelector((state: RootState) => state.trainingSessions.list);
    const [trainingSession, setTrainingSession] = useState<TrainingSession | undefined>(undefined);

    let previousTrainingSessionLength = useRef<number>(0);

    useEffect(() => {
        if (trainingSessions.length > previousTrainingSessionLength.current) {
            setTrainingSession(trainingSessions[trainingSessions.length - 1]);
        }
        else {
            setTrainingSession(undefined);
        }

        previousTrainingSessionLength.current = trainingSessions.length;
    }, [trainingSessions.length]);

    return {
        trainingSession
    };
}