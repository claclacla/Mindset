"use client";

import { useState } from "react";

import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';

import useIsClient from './hooks/useIsClient';
import useLogin from "./hooks/useLogin";

export default function Home() {
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { isClient } = useIsClient();
    const { login } = useLogin();

    if (!isClient) {
        return;
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TO DO: Add the logic for the unauthorized case 

        await login({ username, password });

        router.push('/training-sessions');
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
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Login
                </button>
            </form>

        </div>
    );
}
