import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar"
import BottomNavigationMenu from "../../components/BottomNavigationMenu"
import { Box } from "@mui/material"

import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import queryString from "query-string";


import Home from "./Home"
import Articles from "./Articles"
import Help from "./Help"
import Profile from "./Profile"
import { useSnackbar } from 'notistack';

import { wsSignals, wsArticles } from "../../api/socket"




const Panel = () => {

    const history = useHistory()
    const location = useLocation()
    const { enqueueSnackbar, } = useSnackbar()


    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.ref) {
            if (user) history.replace("/")
            else localStorage.setItem('ref', parsed.ref)
        }
        if (!user) history.replace("/auth")

        setTimeout(() => {
            wsConnection()
        }, 500)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const wsConnection = () => {
        wsSignals.onmessage = function (event) {
            const json = JSON.parse(event.data);
            enqueueSnackbar(JSON.stringify(json), { variant: 'info' })
            // toggleNotify()
        }

        wsArticles.onmessage = function (event) {
            const json = JSON.parse(event.data);
            enqueueSnackbar(JSON.stringify(json), { variant: 'info' })
            // toggleNotify()
        }
    }




    if (!user) return null;
    return <Box sx={{ mb: 7 }}>
        <AppBar />
        <Box component="main" sx={{ p: 3, }} >
            <Switch>
                <Route path="/articles" component={Articles} />
                <Route path="/help" component={Help} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        </Box>
        <BottomNavigationMenu />
    </Box>
}
export default Panel;