import { useEffect, useState } from 'react';

import { Snackbar, Alert } from '@mui/material';

import { TrainingSession } from '@/app/entities/TrainingSession';

import useShowNewTrainingSessionMessage from "@/app/hooks/useShowNewTrainingSessionMessage";

// TO DO: Implement the logic to show the training session data

export default function NewTrainingSessionMessage({ trainingSession } : {trainingSession: TrainingSession}) {
    const { showNewTrainingSession, onCloseNewTrainingSession } = useShowNewTrainingSessionMessage({ trainingSession });

    return (
        <Snackbar open={showNewTrainingSession} autoHideDuration={3000} onClose={onCloseNewTrainingSession}>
            <Alert onClose={onCloseNewTrainingSession} severity="success" sx={{ width: "100%" }}>
                A new training session has been created!
            </Alert>
        </Snackbar>
    );
}