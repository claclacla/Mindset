import { useDispatch } from "react-redux";

import { setTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";
import { setKey } from "@/app/repositories/redux/authentication/slice";

import { User } from "@/app/entities/User";

import authenticate from "@/app/repositories/api/authenticate";
import getTrainingSessions from "@/app/repositories/api/getTrainingSessions";

import { APIGetTrainingSessionResponse } from "@/app/repositories/api/responses/APIGetTrainingSessionResponse";
import { APIGetTrainingSessionParameters } from "@/app/repositories/api/parameters/APIGetTrainingSessionParameters";

export default function useLogin() {
    const dispatch = useDispatch();

    async function login({ username, password }: User) {
        const key: string | undefined = await authenticate({ username, password });

        if (key !== undefined) {
            dispatch(setKey(key));

            const apiGetTrainingSessionParameters: APIGetTrainingSessionParameters = {
                key
            }

            const apiGetTrainingSessionResponse: APIGetTrainingSessionResponse = await getTrainingSessions({ apiGetTrainingSessionParameters });
            dispatch(setTrainingSessions(apiGetTrainingSessionResponse.trainingSessions));
        }
    }

    return {
        login
    }
}