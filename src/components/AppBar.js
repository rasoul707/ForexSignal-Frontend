import * as React from 'react';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


import Container from '@mui/material/Container';

import Logo from './Logo';





const ResponsiveAppBar = () => {


    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* logo */}
                    <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
                    <Box sx={{ p: 1, display: 'flex', }} component="a" href="/">
                        <Logo width="45" style={{ backgroundColor: "#ffffffc9", borderRadius: "50%" }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
                    {/*  logo */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;