/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar"
import BottomNavigationMenu from "../../components/BottomNavigationMenu"
import { Box, Button } from "@mui/material"

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";


import Home from "./Home"
import News from "./News"
import NewsSingle from "./News/single"
import Support from "./Support"
import Profile from "./Profile"
import { useSnackbar } from 'notistack';

import { wsSignals, } from "../../api/socket"
import * as API from "../../api";

import { haveLicense } from "../../components/LicenseAlert"
import LicensesDialog from "../../components/LicenseDialog"


const Panel = () => {

    const history = useHistory()
    const location = useLocation()
    const { enqueueSnackbar, } = useSnackbar()


    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()
    const audioPlayer = React.useRef(null);


    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (!user) {
            if (parsed.ref) {
                localStorage.setItem('ref', parsed.ref)
                history.replace("/auth/signup/")
            }
            else history.replace("/auth/signin/")
        }
    }, [])

    useEffect(() => {
        setTimeout(async () => {
            await getSignalsAlertList()
        }, 500)
    }, [user?.broker])





    const getSignalsAlertList = async () => {

        if (!user) return
        if (!user.broker) return
        if (!haveLicense(user)) {
            dispatch({ type: 'LICENSE_OPEN', payload: { open: true } })
            return
        }
        try {
            const response = await API.GET(true)('notice/signal/?broker=' + user.broker + '&per=100')
            dispatch({ type: 'SIGNAL_LIST', payload: { signalsList: response.data } })
        } catch (error) {
            enqueueSnackbar("[getsignals]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        }


        wsSignals(user.broker).onmessage = function (event) {
            const { data } = JSON.parse(event.data);
            if (!data.id) {
                dispatch({
                    type: 'SIGNAL_LIST_ADD',
                    payload: { signal: data }
                })
                enqueueSnackbar("New Signal Received", {
                    variant: 'info',
                    action: <Button color="inherit" size="small" onClick={() => { history.push("/") }} children="SHOW" />,
                })
                const audioRef = audioPlayer.current;
                const audio = audioRef.play()
                if (audio !== undefined) {
                    audio.then(_ => {
                        audioRef.muted = false;
                        audioRef.play();
                    }).catch(error => {
                        audioRef.muted = true;
                        audioRef.play();
                    });
                }
            }
        }

    }

    const licenseDigOpen = useSelector(state => state.panel.openLicenseDialog)






    if (!user) return null;

    return <Box sx={{ mb: 7 }}>
        <AppBar />
        <Box component="main" sx={{ p: 3, }} >
            <Switch>
                <Route path="/news/:news_id" component={NewsSingle} />
                <Route path="/news" component={News} />

                <Route path="/support" component={Support} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        </Box>
        <BottomNavigationMenu />
        <audio ref={audioPlayer} src={"/static/audio/notify.wav"} />
        <LicensesDialog
            {...{
                open: licenseDigOpen,
                handleClose: () => dispatch({ type: 'LICENSE_OPEN', payload: { open: false } })
            }}
        />
    </Box>
}
export default Panel;