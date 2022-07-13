/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar"
import BottomNavigationMenu from "../../components/BottomNavigationMenu"
import { Box, Button, AlertTitle } from "@mui/material"

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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()


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




    const nativeNotification = (body) => {
        new Notification("New signal received", {
            icon: '/logo.v2.192.png',
            body: body,
            data: 'Trader Signal',
            vibrate: [200, 100, 200],
        });
    }

    const inAppNotification = (body) => {
        enqueueSnackbar([
            <AlertTitle>New signal Received</AlertTitle>,
            <br></br>,
            { body }
        ], {
            variant: 'info',
            persist: true,
        })
        const audioRef = audioPlayer.current;
        audioRef.play()
            .then(_ => { })
            .catch(error => {
                enqueueSnackbar("Do you want to play a sound when receive signal?", {
                    variant: 'info',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    },
                    preventDuplicate: true,
                    action: (snackbarId) => <Button color="inherit" size="small" children="Yes" onClick={() => closeSnackbar(snackbarId)} />
                })
            });
    }

    const newSignalNotify = (data) => {
        const m = data.description.split(",")
        const body = data.title + " > " + m[0] + " ~ " + m[1];
        if (Notification.permission === 'granted') {
            nativeNotification(body)
        }
        else {
            inAppNotification(body)
        }
    }


    const getSignalsAlertList = async () => {

        if (!user) return
        if (!user.broker) return
        if (!haveLicense(user)) {
            dispatch({ type: 'LICENSE_OPEN', payload: { open: true } })
            return
        }

        wsSignals(user.broker).onmessage = function (event) {
            const { data } = JSON.parse(event.data);
            if (!data.id) {
                dispatch({
                    type: 'SIGNAL_LIST_ADD',
                    payload: { signal: data }
                })
                newSignalNotify(data);
            }
        }


        try {
            const response = await API.GET(true)('notice/signal/?broker=' + user.broker + '&per=100')
            dispatch({ type: 'SIGNAL_LIST', payload: { signalsList: response.data } })
        } catch (error) {
            enqueueSnackbar("[getsignals]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
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