import { createSlice } from "@reduxjs/toolkit";

import { TrainingSession } from "@/app/entities/TrainingSession";

interface LocalTrainingSessions {
    list: TrainingSession[]
    newTrainingSession?: TrainingSession
}

const trainingSessions: LocalTrainingSessions = {
    list: [],
    newTrainingSession: undefined
};

// TO DO: Add the logic to check the validity of the TrainingSession objects

const trainingSessionsSlice = createSlice({
    name: "trainingSessions",
    initialState: trainingSessions,
    reducers: {
        setTrainingSessions: (state, action) => {
            state.list = action.payload;
        },
        addTrainingSession: (state, action) => {
            const trainingSession: TrainingSession = action.payload;

            state.newTrainingSession = trainingSession;
            state.list.push(trainingSession);
        },
        unsetTrainingSessions: (state) => {
            state.list = []
        }
    },
});

export const { setTrainingSessions, addTrainingSession, unsetTrainingSessions } = trainingSessionsSlice.actions;
export default trainingSessionsSlice.reducer;
