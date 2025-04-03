import { JSX } from "react";

import { Grid, useTheme } from "@mui/system";
import { Typography } from "@mui/material";

export default function ErrorMessage({ message, showError }: { message: string, showError: boolean }): JSX.Element {
    const theme = useTheme();

    return (
        <Grid size={12}>
            {showError && (<Typography sx={{p: 1, backgroundColor: theme.palette.primary.main, fontSize: "1rem", textAlign: "center"}}>{message}</Typography>)}
        </Grid>
    );
}