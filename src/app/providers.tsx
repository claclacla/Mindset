'use client'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './repositories/store';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme/theme';
import './globals.css';

import { AuthProvider } from './context/authContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </AuthProvider>
    );
}