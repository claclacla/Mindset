import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import useIsMobile from "@/app/hooks/useIsMobile";

export default function ApplicationBar({ toggleShowLeftBar }: { toggleShowLeftBar: () => void }) {
    const { isMobile } = useIsMobile();

    return (
        <Box>
            {isMobile && (
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{ boxShadow: 'none', backgroundColor: 'blu', color: 'black' }}
                >
                    <Toolbar>
                        <IconButton
                            aria-label="menu"
                            onClick={toggleShowLeftBar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography>
                            My App
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
        </Box>
    );
}