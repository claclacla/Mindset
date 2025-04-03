"use client";

import { JSX } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import SessionsTable from '@/app/components/SessionsTable';
import NewTrainingSessionMessage from '@/app/components/NewTrainingSessionMessage';
import ApplicationBar from '@/app/components/ApplicationBar';

import useIsClient from '@/app/hooks/useIsClient';
import useNewTrainingSessionWebSocket from '@/app/hooks/useNewTrainingSessionWebSocket';
import useInsertLocalStorageNewTrainingSession from '@/app/hooks/useInsertLocalStorageNewTrainingSession';
import useIsMobile from '@/app/hooks/useIsMobile';
import useShowLeftBar from '@/app/hooks/useShowLeftBar';

export default function TrainingSessions(): JSX.Element | undefined {
    const { isClient } = useIsClient();
    const { trainingSession } = useNewTrainingSessionWebSocket();
    useInsertLocalStorageNewTrainingSession({ trainingSession });

    const { isMobile } = useIsMobile();
    const { showLeftBar, toggleShowLeftBar } = useShowLeftBar({ isMobile });

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
                width: "100%"
            }}>
                <ApplicationBar toggleShowLeftBar={toggleShowLeftBar} />

                <Box sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "auto"
                }}>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid size={12}>
                            <Typography className="text-xl font-semibold">Training sessions</Typography>
                        </Grid>

                        <Grid size={12}>
                            <SessionsTable />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {trainingSession && <NewTrainingSessionMessage trainingSession={trainingSession} />}
        </Box>
    );
}
