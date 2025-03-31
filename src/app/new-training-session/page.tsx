"use client";

import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';

import useIsClient from '@/app/hooks/useIsClient';

export default function NewTrainingSession() {
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
                <h2>New session</h2>
            </Box>
        </Box>
    );
}