import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8bc34a', // Tailwind green-300 (light green)
            contrastText: '#065f46', // Tailwind green-900 (for better contrast)
        },
        secondary: {
            main: '#f9a8d4', // Tailwind pink-300 (antique pink)
            contrastText: '#831843', // Tailwind pink-900 (for better contrast)
        },
        background: {
            default: '#f3f4f6', // Tailwind gray-100 (light gray)
            paper: '#ffffff', // White background for components
        },
        text: {
            primary: '#1f2937', // Tailwind gray-800 (dark text)
            secondary: '#374151', // Tailwind gray-600
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Slightly rounded corners
                    textTransform: 'none', // Remove uppercase transformation
                    padding: '10px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none', // Remove shadow on hover
                        color: '#ffffff'
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#8bc34a', // Light Green as background
                    color: '#fff', // Text color
                },
            },
        },
        
    }
});

export default theme;
