"use client";

import { JSX } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import useAuth from "@/app/hooks/useAuth";

import ErrorMessage from "@/app/components/ErrorMessage";

import useIsClient from '@/app/hooks/useIsClient';
import useLoginFormHandler from '@/app/hooks/useLoginFormHandler';

export default function Home(): JSX.Element | undefined {
    const { isClient } = useIsClient();
    const { login } = useAuth();
    const { loginUser, handleFieldChange, handleLogin, authenticationError } = useLoginFormHandler({ login });

    if (!isClient) {
        return;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                minHeight: "100vh", 
                bgcolor: "background.default", 
            }}
        >
            <Box
                sx={{
                    width: { xs: "90%", sm: "400px" }, 
                    p: { xs: 2, sm: 4 },
                    bgcolor: "white",
                    boxShadow: 1,
                    borderRadius: 0,
                }}
            >

                <Grid container spacing={2}>

                    <Grid size={12}>
                        <Typography sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }} variant="h6">Login</Typography>
                    </Grid>

                    <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        The only valid user is:
                    </Typography>
                    <Typography sx={{ fontSize: "0.9rem" }}>
                        Username: scobalit.desio
                        <br />
                        Password: password
                    </Typography>

                    <Grid size={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            value={loginUser.email}
                            onChange={(e) => handleFieldChange(e)}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            fullWidth
                            value={loginUser.password}
                            onChange={(e) => handleFieldChange(e)}
                        />
                    </Grid>

                    <ErrorMessage message={"Authentication error"} showError={authenticationError} />

                    <Button type="submit" variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>

                </Grid>

            </Box>
        </Box>
    );
}
