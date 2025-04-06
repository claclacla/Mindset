import { JSX } from "react";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { User } from "firebase/auth";

import useInsertTrainingSessionByPromptFormHandler from "@/app/hooks/useInsertTrainingSessionByPromptFormHandler";
import ErrorMessage from "@/app/components/ErrorMessage";

export default function InsertTrainingSessionByPromptForm({user}: {user: User}): JSX.Element {
    const { hasEmptyFieldsError, prompt, onFormFieldChange, onSubmit } = useInsertTrainingSessionByPromptFormHandler({ user });

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>

            <Grid size={12}>
                <Typography className="text-xl font-semibold">Insert training session by prompt</Typography>
            </Grid>

            <Grid size={12}>

                <form onSubmit={onSubmit}>

                    <Grid container spacing={2}>

                        <Grid size={12}>
                            <TextField
                                label="Prompt"
                                variant="outlined"
                                fullWidth
                                name="prompt"
                                value={prompt}
                                onChange={onFormFieldChange}
                            />
                        </Grid>

                        <ErrorMessage message={"The form has empty fields"} showError={hasEmptyFieldsError} />

                        <Button type="submit" variant="contained" color="primary">
                            Insert
                        </Button>
                    </Grid>

                </form>

            </Grid>
        </Grid>
    );
}