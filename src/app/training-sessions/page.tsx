"use client";

import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import SessionsTable from '@/app/components/SessionsTable';
import NewTrainingSessionMessage from '@/app/components/NewTrainingSessionMessage';

import useIsClient from '@/app/hooks/useIsClient';
import useNewTrainingSessionWebSocket from '@/app/hooks/useNewTrainingSessionWebSocket';
import useInsertLocalStorageNewTrainingSession from '@/app/hooks/useInsertLocalStorageNewTrainingSession';

export default function TrainingSessions() {
    const { isClient } = useIsClient();
    const { trainingSession } = useNewTrainingSessionWebSocket();
    useInsertLocalStorageNewTrainingSession({ trainingSession });

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
                <div className="text-xl font-semibold mb-4">Training sessions</div>

                <SessionsTable />
            </Box>

            {trainingSession && <NewTrainingSessionMessage trainingSession={trainingSession}/>}
        </Box>
    );
}
