"use client";

import { JSX } from 'react';
import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import InsertTrainingSessionByPromptForm from '@/app/components/InsertTrainingSessionByPromptForm';
import ApplicationBar from '../components/ApplicationBar';

import useIsClient from '@/app/hooks/useIsClient';
import useIsMobile from '@/app/hooks/useIsMobile';
import useShowLeftBar from '@/app/hooks/useShowLeftBar';

export default function NewTrainingSessionByPrompt(): JSX.Element | undefined {
    const { isClient } = useIsClient();
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
            }}>

                <ApplicationBar toggleShowLeftBar={toggleShowLeftBar} />

                <InsertTrainingSessionByPromptForm />

            </Box>
        </Box>
    );
}

