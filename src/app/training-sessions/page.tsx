"use client";

import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import SessionsTable from '@/app/components/SessionsTable';
import NewTrainingSessionMessage from '@/app/components/NewTrainingSessionMessage';

import useIsClient from '@/app/hooks/useIsClient';
import useNewTrainingSessionWebSocket from '@/app/hooks/useNewTrainingSessionWebSocket';
import useInsertNewTrainingSession from '@/app/hooks/useInsertNewTrainingSession';

export default function TrainingSessions() {
    const { isClient } = useIsClient();
    const { trainingSession } = useNewTrainingSessionWebSocket();
    useInsertNewTrainingSession({ trainingSession });

    if (!isClient) {
        return null;
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
                <div className="mb-4">
                    <h2>Training sessions</h2>
                </div>

                <SessionsTable />
            </Box>

            {trainingSession && <NewTrainingSessionMessage trainingSession={trainingSession}/>}
        </Box>
    );
}
