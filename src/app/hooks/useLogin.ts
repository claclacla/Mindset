import { useDispatch } from "react-redux";

import { setTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";
import { setKey } from "@/app/repositories/redux/authentication/slice";

import { TrainingSession } from '@/app/entities/TrainingSession';
import { User } from "@/app/entities/User";

import authenticate from "@/app/repositories/api/authenticate";
import getTrainingSessions from "@/app/repositories/api/getTrainingSessions";

export default function useLogin() {
    const dispatch = useDispatch();

    async function login({ username, password }: User) {
        const key: string | undefined = await authenticate({ username, password });

        if (key !== undefined) {
            dispatch(setKey(key));

            const trainingSessions: TrainingSession[] = await getTrainingSessions({ key });
            dispatch(setTrainingSessions(trainingSessions));
        }
    }

    return {
        login
    }
}