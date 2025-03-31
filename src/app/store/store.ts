/*import { configureStore } from "@reduxjs/toolkit";
import trainingSessionsReducer from "./trainingSessions/slice";
import authenticationReducer from "./authentication/slice";

export const store = configureStore({
    reducer: {
        trainingSessions: trainingSessionsReducer,
        authentication: authenticationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
*/

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import trainingSessionsReducer from "./trainingSessions/slice";
import authenticationReducer from "./authentication/slice";

const rootReducer = combineReducers({
    trainingSessions: trainingSessionsReducer,
    authentication: authenticationReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authentication', 'trainingSessions'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
