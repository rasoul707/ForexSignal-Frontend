import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar"
import BottomNavigationMenu from "../../components/BottomNavigationMenu"
import { Box } from "@mui/material"

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";


import Home from "./Home"
import Articles from "./Articles"
import Help from "./Help"
import Profile from "./Profile"
import { useSnackbar } from 'notistack';

import { wsSignals, wsArticles } from "../../api/socket"
import * as API from "../../api";





const Panel = () => {

    const history = useHistory()
    const location = useLocation()
    const { enqueueSnackbar, } = useSnackbar()


    const user = useSelector(state => state.auth.user)
    const signalsList = useSelector(state => state.panel)

    const dispatch = useDispatch()

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.ref) {
            if (user) history.replace("/")
            else localStorage.setItem('ref', parsed.ref)
        }
        if (!user) history.replace("/auth")

        getSignalsAlertList()
        getArticlesList()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getSignalsAlertList = async () => {
        try {
            const response = await API.GET(true)('notice/signal/?broker=' + user.broker)
            dispatch({ type: 'SIGNAL_LIST', payload: { signalsList: response.data } })

            wsSignals().onmessage = function (event) {
                const data = JSON.parse(event.data);
                const m = {
                    broker: { id: 1, name: "Alpary", logo: 1 },
                    broker_id: 1,
                    description: "fdgdfgddhfdhfd",
                    id: 2,
                    image: null,
                    image_id: null,
                    is_active: true,
                    title: "Test " + Math.random(),
                }

                dispatch({
                    type: 'SIGNAL_LIST_ADD',
                    payload: { signal: m }
                })

                enqueueSnackbar("New Signal Received", { variant: 'info' })
            }

        } catch (error) {
            enqueueSnackbar("[getsignals]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        }
    }

    const getArticlesList = async () => {

    }


    const wsConnection = () => {


        // wsArticles.onmessage = function (event) {
        //     const json = JSON.parse(event.data);
        //     enqueueSnackbar(JSON.stringify(json), { variant: 'info' })
        //     // toggleNotify()
        // }
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