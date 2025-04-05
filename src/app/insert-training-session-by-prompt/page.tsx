"use client";

import { useDispatch } from 'react-redux';

import { JSX, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import ApplicationBar from '../components/ApplicationBar';

import useIsClient from '@/app/hooks/useIsClient';
import useIsMobile from '@/app/hooks/useIsMobile';
import useShowLeftBar from '@/app/hooks/useShowLeftBar';

import { APIGeminiParameters } from '../repositories/api/parameters/APIGeminiParameters';
import { useSelector } from 'react-redux';
import { RootState } from '../repositories/store';
import gemini from '../repositories/api/gemini';
import { APIGeminiResponse } from '../repositories/api/responses/APIGeminiResponse';

import { addTrainingSession } from '@/app/repositories/redux/trainingSessions/slice';

export default function NewTrainingSession(): JSX.Element | undefined {
    const dispatch = useDispatch();
    const key: string | undefined = useSelector((state: RootState) => state.authentication.key);

    const { isClient } = useIsClient();
    const { isMobile } = useIsMobile();
    const { showLeftBar, toggleShowLeftBar } = useShowLeftBar({ isMobile });

    const [prompt, setPrompt] = useState<string>("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (key === undefined) {
            return;
        }

        const apiGeminiParameters: APIGeminiParameters = {
            key,
            prompt
        };

        const apiGeminiResponse: APIGeminiResponse = await gemini({ apiGeminiParameters });
        console.log(apiGeminiResponse);

        dispatch(addTrainingSession(apiGeminiResponse.response));
    }

    if (!isClient) {
        return;
    }

    return (
        <Box sx={{ display: 'flex' }}>

            <LeftBar showLeftBar={showLeftBar} toggleShowLeftBar={toggleShowLeftBar} />

            <Box sx={{
                flexGrow: 1,
                marginLeft: isMobile ? 0 : "240px",
                minHeight: '100vh',
            }}>

                <ApplicationBar toggleShowLeftBar={toggleShowLeftBar} />

                <Grid container spacing={2} sx={{ p: 2 }}>

                    <Grid size={12}>
                        <Typography className="text-xl font-semibold">Insert training session by prompt</Typography>
                    </Grid>

                    <Grid size={12}>

                        <form onSubmit={onSubmit}>

                            <Grid container spacing={2}>

                                <Grid size={12}>
                                    <TextField
                                        label="Prompt"
                                        variant="outlined"
                                        fullWidth
                                        name="prompt"
                                        value={prompt}
                                        onChange={(event) => setPrompt(event.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Button type="submit" variant="contained" color="primary">
                                Insert
                            </Button>

                        </form>

                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}
function dispatch(arg0: { payload: any; type: "trainingSessions/addTrainingSession"; }) {
    throw new Error('Function not implemented.');
}

