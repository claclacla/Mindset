import { createSlice } from "@reduxjs/toolkit";

import { TrainingSession } from "@/app/entities/TrainingSession";

interface LocalTrainingSessions {
    list: TrainingSession[]
}

const trainingSessions: LocalTrainingSessions = {
    list: []
};

const trainingSessionsSlice = createSlice({
    name: "trainingSessions",
    initialState: trainingSessions,
    reducers: {
        setTrainingSessions: (state, action) => {
            state.list = action.payload;
        },
        addTrainingSessions: (state, action) => {
            const trainingSession: TrainingSession = action.payload;
            state.list.push(trainingSession);
        },
    },
});

export const { setTrainingSessions, addTrainingSessions } = trainingSessionsSlice.actions;
export default trainingSessionsSlice.reducer;
