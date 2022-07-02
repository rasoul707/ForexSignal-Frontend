import * as React from 'react';
import { Link as LinkRoute } from "react-router-dom"
import { useSelector } from "react-redux";



import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import LogoIcon from '@mui/icons-material/TableChart';
import NewSoftIcon from '@mui/icons-material/Add';
import SoftsIcon from '@mui/icons-material/Edit';
import EvaluationIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from './Logo';
import * as API from "../api";

const pages = [
    { title: 'New Software', icon: <NewSoftIcon />, url: '/softwares/new' },
    { title: 'Manage Softwares', icon: <SoftsIcon />, url: '/softwares' },
    { title: 'Evaluations', icon: <EvaluationIcon />, url: '/evaluations' }
];


const ResponsiveAppBar = () => {

    const user = useSelector(state => state.auth.user)

    const logout = async () => {
        await API.POST(true)('auth/logout/')
        localStorage.clear()
        window.location.reload()
    }



    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* logo */}
                    <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
                    <Box sx={{ p: 1, display: 'flex', }} component="a" href="/">
                        <Logo width="35" />
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
                    {/*  logo */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;