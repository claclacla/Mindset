"use client";

import { useState } from "react";

import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';

import useIsClient from '@/app/hooks/useIsClient';
import useLogin from "@/app/hooks/useLogin";

import { initUser, User } from "@/app/entities/User";

export default function Home() {
    const router = useRouter();

    const [user, setUser] = useState<User>(initUser());

    const { isClient } = useIsClient();
    const { login } = useLogin();

    const [authenticationError, setAuthenticationError] = useState<boolean>(false);

    if (!isClient) {
        return;
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

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <form
                onSubmit={onSubmit}
                className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm"
            >
                <h2 className="text-xl font-semibold text-center mb-6">Login</h2>

                <div className="mb-6">
                    <div className="text-base">The only valid user is:</div>
                    <div className="text-sm">Username: scobalit.desio</div>
                    <div className="text-sm">Password: password</div>
                </div>

                <div className="mb-6">
                    <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        fullWidth
                        value={user.username}
                        onChange={onFormFieldChange}
                    />
                </div>

                <div className="mb-6">
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        fullWidth
                        value={user.password}
                        onChange={onFormFieldChange}
                    />
                </div>

                {authenticationError && (<div className="w-full px-2 py-2 bg-red-300 text-center mb-6">Errore di autenticazione</div>)}

                <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Login
                </button>


            </form>

        </div>
    );
}
