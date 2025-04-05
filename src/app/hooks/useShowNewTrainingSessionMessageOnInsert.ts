import { useSelector } from "react-redux";

import { TrainingSession } from "@/app/entities/TrainingSession";
import { RootState } from "@/app/repositories/store";

export default function useShowNewTrainingSessionMessageOnInsert() {
    const newTrainingSession: TrainingSession | undefined = useSelector((state: RootState) => state.trainingSessions.newTrainingSession);

    return {
        newTrainingSession
    }
}