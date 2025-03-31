"use client";

import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import SessionsTable from '@/app/components/SessionsTable';

import useIsClient from '@/app/hooks/useIsClient';

export default function TrainingSessions() {
    const { isClient } = useIsClient();

    if (!isClient) {
        return;
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
        </Box>
    );
}
