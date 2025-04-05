"use client";

import { JSX, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useRouter } from 'next/navigation';

import useLogout from '@/app/hooks/useLogout';
import useIsMobile from '@/app/hooks/useIsMobile';
import useShowLeftBar from '@/app/hooks/useShowLeftBar';

export default function LeftBar({ showLeftBar, toggleShowLeftBar }: { showLeftBar: boolean, toggleShowLeftBar: () => void }): JSX.Element {
    const router = useRouter();
    const { logout } = useLogout();

    const { isMobile } = useIsMobile();

    async function onClickLogout() {
        logout();
        router.push('/');
    }

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={showLeftBar}
            onClose={isMobile ? toggleShowLeftBar : undefined}
            anchor="left"
        >
            <Box sx={{ width: 240 }}>
                <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>

                <List>
                    <ListItem key={"training-sessions"} disablePadding>
                        <ListItemButton onClick={() => router.push('/training-sessions')}>
                            <ListItemText primary={"Training sessions"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"insert-training-session"} disablePadding>
                        <ListItemButton onClick={() => router.push('/insert-training-session')}>
                            <ListItemText primary={"Insert training session"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"insert-training-session-by-prompt"} disablePadding>
                        <ListItemButton onClick={() => router.push('/insert-training-session-by-prompt')}>
                            <ListItemText primary={"Insert training session by prompt"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"logout"} disablePadding>
                        <ListItemButton onClick={() => onClickLogout()}>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}