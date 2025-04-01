import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { addTrainingSession } from "../repositories/redux/trainingSessions/slice";

import { TrainingSession } from "../entities/TrainingSession";

export default function useInsertNewTrainingSession({ trainingSession }: { trainingSession: TrainingSession | undefined }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(trainingSession === undefined) {
            return;
        }

        dispatch(addTrainingSession(trainingSession));
    }, [trainingSession]);
}