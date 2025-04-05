import { JSX } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import useInsertTrainingSessionFormHandler from "@/app/hooks/useInsertTrainingSessionFormHandler";

import ErrorMessage from "@/app/components/ErrorMessage";

export default function InsertTrainingSessionForm(): JSX.Element {
    const { hasEmptyFieldsError, trainingSession, onFormFieldChange, onSubmit } = useInsertTrainingSessionFormHandler();

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>

            <Grid size={12}>
                <Typography className="text-xl font-semibold">Insert training session</Typography>
            </Grid>

            <Grid size={12}>
                
                <form onSubmit={onSubmit}>

                    <Grid container spacing={2}>

                        <Grid size={12}>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                fullWidth
                                name="firstName"
                                value={trainingSession.firstName}
                                onChange={onFormFieldChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Lastname"
                                variant="outlined"
                                fullWidth
                                name="lastName"
                                value={trainingSession.lastName}
                                onChange={onFormFieldChange}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                label="Age"
                                type="number"
                                variant="outlined"
                                fullWidth
                                name="age"
                                value={trainingSession.age}
                                onChange={onFormFieldChange}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                label="Distance"
                                type="number"
                                variant="outlined"
                                fullWidth
                                name="distance"
                                value={trainingSession.distance}
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