"use client";

import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';

import useIsClient from '@/app/hooks/useIsClient';

import InsertTrainingSessionForm from '../components/InsertTrainingSessionForm';

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
                <div className="text-xl font-semibold mb-4">New training session</div>

                <InsertTrainingSessionForm />

            </Box>
        </Box>
    );
}