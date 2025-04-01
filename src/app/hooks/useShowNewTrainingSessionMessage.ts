import { useEffect, useState } from "react";
import { TrainingSession } from "../entities/TrainingSession";

export default function useShowNewTrainingSessionMessage({ trainingSession }: { trainingSession: TrainingSession }) {
    const [showNewTrainingSession, setShowNewTrainingSession] = useState<boolean>(false);

    function onCloseNewTrainingSession() {
        setShowNewTrainingSession(false);
    }

    useEffect(() => {
        if (trainingSession === undefined) {
            return;
        }

        setShowNewTrainingSession(true);
    }, [trainingSession]);

    return {
        showNewTrainingSession,
        onCloseNewTrainingSession
    };
}