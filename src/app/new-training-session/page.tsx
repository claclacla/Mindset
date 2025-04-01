"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, TextField } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';

import useIsClient from '@/app/hooks/useIsClient';

import { RootState } from '@/app/repositories/store';

import { TrainingSession } from '@/app/entities/TrainingSession';

import { APIInsertTrainingSessionParameters } from '@/app/repositories/api/parameters/APIInsertTrainingSessionParameters';
import { APIInsertTrainingSessionResponse } from '../repositories/api/responses/APIInsertTrainingSessionResponse';
import insertTrainingSession from '@/app/repositories/api/insertTrainingSession';

import { addTrainingSession } from '@/app/repositories/redux/trainingSessions/slice';

export default function NewTrainingSession() {
    const dispatch = useDispatch();

    const key: string | undefined = useSelector((state: RootState) => state.authentication.key);
    const [trainingSession, setTrainingSession] = useState<TrainingSession>({
        lastName: "",
        firstName: "",
        age: 0,
        distance: 0
    });

    const { isClient } = useIsClient();

    if (!isClient) {
        return;
    }

    function onFormFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setTrainingSession((prevData: TrainingSession) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(key === undefined) {
            return;
        }

        const apiInsertTrainingSessionParameters: APIInsertTrainingSessionParameters = {
            key,
            trainingSession
        }

        const apiInsertTrainingSessionResponse: APIInsertTrainingSessionResponse = await insertTrainingSession({ apiInsertTrainingSessionParameters });
        dispatch(addTrainingSession(apiInsertTrainingSessionResponse.trainingSession));
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />

            <Box
                sx={{
                    flexGrow: 1, // Takes remaining space
                    bgcolor: "white",
                    p: 3,
                }}
            >
                <div className="text-xl font-semibold mb-4">New training session</div>

                <form
                    onSubmit={onSubmit}
                    className="w-full max-w-md"
                >

                    <div className="mb-6">
                        <TextField
                            label="Firstname"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={trainingSession.firstName}
                            onChange={onFormFieldChange}
                        />
                    </div>

                    <div className="mb-6">
                        <TextField
                            label="Lastname"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={trainingSession.lastName}
                            onChange={onFormFieldChange}
                        />
                    </div>

                    <div className="mb-6 flex items-center space-x-4">
                        <TextField
                            label="Age"
                            type="number"
                            variant="outlined"
                            fullWidth
                            name="age"
                            sx={{ marginRight: 4 }}
                            value={trainingSession.age}
                            onChange={onFormFieldChange}
                        />

                        <TextField
                            label="Distance"
                            type="number"
                            variant="outlined"
                            fullWidth
                            name="distance"
                            value={trainingSession.distance}
                            onChange={onFormFieldChange}
                        />
                    </div>

                    <button className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Insert
                    </button>
                </form>

            </Box>
        </Box>
    );
}