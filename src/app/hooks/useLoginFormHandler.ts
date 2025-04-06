import { useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from 'next/navigation';

import { LoginUser, initLoginUser } from "../entities/LoginUser";

import { setTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";

import getTrainingSessions from "@/app/repositories/api/getTrainingSessions";

import { APIGetTrainingSessionResponse } from "@/app/repositories/api/responses/APIGetTrainingSessionResponse";
import { APIGetTrainingSessionParameters } from "@/app/repositories/api/parameters/APIGetTrainingSessionParameters";

import { User } from "firebase/auth";

export default function useLoginFormHandler({ login }: { login: (email: string, password: string) => Promise<User> }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [authenticationError, setAuthenticationError] = useState<boolean>(false);

    const [ loginUser, setLoginUser ] = useState<LoginUser>(initLoginUser());

    function handleFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setAuthenticationError(false);

        setLoginUser((prevData: LoginUser) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleLogin = async () => {
        try {
            const loggedInUser: User | null = await login(loginUser.email, loginUser.password);
            const idToken = await loggedInUser.getIdToken();

            const apiGetTrainingSessionParameters: APIGetTrainingSessionParameters = {
                key: idToken
            }
    
            const apiGetTrainingSessionResponse: APIGetTrainingSessionResponse = await getTrainingSessions({ apiGetTrainingSessionParameters });
            dispatch(setTrainingSessions(apiGetTrainingSessionResponse.trainingSessions));

            router.push('/training-sessions');
        } catch (err) {
            setAuthenticationError(true);
        }
    };

    return {
        loginUser,
        handleFieldChange,
        handleLogin,
        authenticationError
    };
}