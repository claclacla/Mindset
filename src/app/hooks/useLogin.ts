import { useState } from "react";
import { useDispatch } from "react-redux";

import { setTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";
import { setKey } from "@/app/repositories/redux/authentication/slice";

import { User } from "@/app/entities/User";

import authenticate from "@/app/repositories/api/authenticate";
import getTrainingSessions from "@/app/repositories/api/getTrainingSessions";

import { APIAuthenticateParameters } from "@/app/repositories/api/parameters/APIAuthenticateParameters";
import { APIAuthenticateResponse } from "@/app/repositories/api/responses/APIAuthenticateResponse";

import { APIGetTrainingSessionResponse } from "@/app/repositories/api/responses/APIGetTrainingSessionResponse";
import { APIGetTrainingSessionParameters } from "@/app/repositories/api/parameters/APIGetTrainingSessionParameters";

export default function useLogin() {
    const dispatch = useDispatch();

    async function login({ username, password }: User) {
        const apiAuthenticateParameters: APIAuthenticateParameters = {
            user: {
                username,
                password
            }
        }

        const apiAuthenticateResponse: APIAuthenticateResponse = await authenticate({ apiAuthenticateParameters });

        dispatch(setKey(apiAuthenticateResponse.key));

        const apiGetTrainingSessionParameters: APIGetTrainingSessionParameters = {
            key: apiAuthenticateResponse.key
        }

        const apiGetTrainingSessionResponse: APIGetTrainingSessionResponse = await getTrainingSessions({ apiGetTrainingSessionParameters });
        dispatch(setTrainingSessions(apiGetTrainingSessionResponse.trainingSessions));
    }

    return {
        login
    }
}