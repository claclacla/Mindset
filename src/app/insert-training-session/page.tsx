"use client";

import { JSX } from 'react';
import { Box } from '@mui/material';

import LeftBar from '@/app/components/LeftBar';
import InsertTrainingSessionForm from '@/app/components/InsertTrainingSessionForm';
import ApplicationBar from '../components/ApplicationBar';

import useIsClient from '@/app/hooks/useIsClient';
import useIsMobile from '@/app/hooks/useIsMobile';
import useShowLeftBar from '@/app/hooks/useShowLeftBar';

export default function NewTrainingSession(): JSX.Element | undefined {
    const { isClient } = useIsClient();
    const { isMobile } = useIsMobile();
    const { showLeftBar, toggleShowLeftBar } = useShowLeftBar({ isMobile });

    if (!isClient) {
        return;
    }

    return (
        <Box sx={{ display: 'flex' }}>

            <LeftBar showLeftBar={showLeftBar} toggleShowLeftBar={toggleShowLeftBar} />

            <Box sx={{
                flexGrow: 1,
                marginLeft: isMobile ? 0 : "240px",
                minHeight: '100vh',
            }}>

                <ApplicationBar toggleShowLeftBar={toggleShowLeftBar} />

                <InsertTrainingSessionForm />

            </Box>
        </Box>
    );

    /*
    const router = useRouter();
    const { isClient } = useIsClient();
    const { logout } = useLogout();
    const [open, setOpen] = useState(false);

    // Check if the screen width is small (mobile view)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { hasEmptyFieldsError, trainingSession, onFormFieldChange, onSubmit } = useInsertTrainingFormHandler();

    // Function to toggle the drawer state
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Automatically close the drawer when switching to mobile
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [isMobile]);

    async function onClickLogout() {
        logout();
        router.push('/');
    }

    if (!isClient) {
        return;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            {isMobile && (
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        marginTop: 2,
                        marginLeft: 1,
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                anchor="left"
                open={open}
                onClose={() => setOpen(false)} // Close the drawer when clicking outside
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="mb-2">
                        <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
                    </div>

                    <button
                        className="w-full text-left text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 transition"
                        onClick={() => router.push('/training-sessions')}
                    >
                        Training sessions
                    </button>
                    <button
                        className="w-full text-left text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 transition"
                        name="go-to-insert-training-session"
                        onClick={() => router.push('/insert-training-session')}
                    >
                        Insert session
                    </button>

                    <div className="flex-grow"></div>

                    <button
                        className="w-full text-left text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 transition"
                        onClick={() => onClickLogout()}
                    >
                        Logout
                    </button>
                </div>
            </Drawer>

            <Box
                sx={{
                    flexGrow: 1, // Takes remaining space
                    bgcolor: "white",
                    p: 3,
                    maxWidth: isMobile ? '100%' : 'calc(100% - 240px)', // Adjust width on small screens
                    marginLeft: isMobile ? 0 : '240px', // Adjust margin based on the screen size
                    transition: 'margin-left 0.3s ease', // Smooth transition when opening/closing drawer
                }}
            >
                <div className="text-xl font-semibold mb-4">Insert training session</div>

                <form
                    onSubmit={onSubmit}
                    className="w-full max-w-md"
                >


                    <Grid container spacing={3}>
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
                    </Grid>

                    <ErrorMessage message={"The form has empty fields"} showError={hasEmptyFieldsError} />

                    <Box sx={{ marginTop: 3 }}>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Insert
                        </button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
    */
}
