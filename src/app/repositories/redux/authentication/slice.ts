import { createSlice } from "@reduxjs/toolkit";

interface LocalTrainingSessions {
    key: string | undefined
}

const authentication: LocalTrainingSessions = {
    key: undefined
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: authentication,
    reducers: {
        setKey: (state, action) => {
            state.key = action.payload;
        },
    },
});

export const { setKey } = authenticationSlice.actions;
export default authenticationSlice.reducer;