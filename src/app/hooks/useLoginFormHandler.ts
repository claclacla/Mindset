import { useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from 'next/navigation';

import { setTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";
import { setKey } from "@/app/repositories/redux/authentication/slice";

import authenticate from "@/app/repositories/api/authenticate";
import getTrainingSessions from "@/app/repositories/api/getTrainingSessions";

import { APIAuthenticateParameters } from "@/app/repositories/api/parameters/APIAuthenticateParameters";
import { APIAuthenticateResponse } from "@/app/repositories/api/responses/APIAuthenticateResponse";

import { APIGetTrainingSessionResponse } from "@/app/repositories/api/responses/APIGetTrainingSessionResponse";
import { APIGetTrainingSessionParameters } from "@/app/repositories/api/parameters/APIGetTrainingSessionParameters";

import { initUser, User } from "@/app/entities/User";

export default function useLoginFormHandler() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState<User>(initUser());
    const [authenticationError, setAuthenticationError] = useState<boolean>(false);

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

    function onFormFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setAuthenticationError(false);

        setUser((prevData: User) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TO DO: Add the logic for the unauthorized case 

        try {
            await login({ username: user.username, password: user.password });
            router.push('/training-sessions');
        }
        catch (error) {
            setAuthenticationError(true);
        }
    }

    return {
        user,
        authenticationError,
        onFormFieldChange,
        onSubmit
    };
}