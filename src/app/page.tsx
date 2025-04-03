"use client";

import { JSX } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import ErrorMessage from "@/app/components/ErrorMessage";

import useIsClient from '@/app/hooks/useIsClient';
import useLoginFormHandler from '@/app/hooks/useLoginFormHandler';

export default function Home(): JSX.Element | undefined {
    const { isClient } = useIsClient();
    const { user, onFormFieldChange, onSubmit, authenticationError } = useLoginFormHandler();

    if (!isClient) {
        return;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column", // Ensures items stack vertically
                alignItems: "center", // Centers horizontally
                justifyContent: "center", // Centers vertically
                minHeight: "100vh", // Makes the box take full viewport height
                bgcolor: "background.default", // Optional: sets a background color
            }}
        >
            <Box
                sx={{
                    width: { xs: "90%", sm: "400px" }, // Responsive width
                    p: { xs: 2, sm: 4 }, // Padding based on screen size
                    bgcolor: "white",
                    boxShadow: 1,
                    borderRadius: 0,
                }}
            >

                <form
                    onSubmit={onSubmit}
                    className="p-6 bg-white w-full max-w-sm"
                >

                    <Grid container spacing={2}>

                        <Grid size={12}>
                            <Typography sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }} variant="h6">Login</Typography>
                        </Grid>

                        <Typography>
                            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                                The only valid user is:
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem" }}>
                                Username: scobalit.desio
                                <br />
                                Password: password
                            </Typography>
                        </Typography>

                        <Grid size={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                name="username"
                                fullWidth
                                value={user.username}
                                onChange={onFormFieldChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                name="password"
                                fullWidth
                                value={user.password}
                                onChange={onFormFieldChange}
                            />
                        </Grid>

                        <ErrorMessage message={"Authentication error"} showError={authenticationError} />

                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>

                    </Grid>

                </form>

            </Box>
        </Box>
    );
}
