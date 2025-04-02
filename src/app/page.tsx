"use client";

import { TextField } from '@mui/material';

import ErrorMessage from "@/app/components/ErrorMessage";

import useIsClient from '@/app/hooks/useIsClient';
import useLoginFormHandler from '@/app/hooks/useLoginFormHandler';

export default function Home() {
    const { isClient } = useIsClient();
    const { user, onFormFieldChange, onSubmit, authenticationError } = useLoginFormHandler();

    if (!isClient) {
        return;
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

                <ErrorMessage message={"Authentication error"} showError={authenticationError}  />

                <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Login
                </button>


            </form>

        </div>
    );
}
