"use client";

import { useState } from 'react';
import { Button, Drawer, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

export default function LeftBar() {
    const router = useRouter();

    const [open, setOpen] = useState(true);

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Ensures space is distributed between content and button
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <div className="flex flex-col h-full">

                <div className="mb-2">
                    <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
                </div>

                <button
                    className="w-full text-left text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 transition"
                    onClick={() => router.push('/training-sessions')}
                >
                    Training sessions
                </button>
                <button
                    className="w-full text-left text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 transition"
                    onClick={() => router.push('/new-training-session')}
                >
                    New session
                </button>

                {/* Empty div takes up available space */}
                <div className="flex-grow"></div>

                <button
                    className="w-full text-left text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 transition"
                    onClick={() => router.push('/')}
                >
                    Logout
                </button>
            </div>
        </Drawer>

    );
}