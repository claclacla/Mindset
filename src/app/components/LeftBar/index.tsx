"use client";

import { JSX } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

import useAuth from "@/app/hooks/useAuth";

import useLogoutHandler from '@/app/hooks/useLogoutHandler';
import useIsMobile from '@/app/hooks/useIsMobile';

export default function LeftBar({ showLeftBar, toggleShowLeftBar }: { showLeftBar: boolean, toggleShowLeftBar: () => void }): JSX.Element {
    const router = useRouter();

    const { isMobile } = useIsMobile();
    const { logout } = useAuth();
    const { logoutHandler } = useLogoutHandler({ logout });

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
                        <ListItemButton onClick={() => logoutHandler()}>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}