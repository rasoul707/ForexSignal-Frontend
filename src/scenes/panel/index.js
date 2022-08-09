/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar"
import BottomNavigationMenu from "../../components/BottomNavigationMenu"
import { Box, Button, Typography } from "@mui/material"

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
import moment from 'moment'

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
        else {
            checkUser()
        }
    }, [])

    const checkUser = () => {
        // setInterval(() => {
        // window.location.reload()
        // }, 15 * 1000 * 60)
    }

    useEffect(() => {
        if (user && user.broker) {
            setTimeout(async () => {
                await getSignalsAlertList()
            }, 500)
            showAllowNotifyAlert()
        }
    }, [user?.broker])




    const nativeNotification = (body, time) => {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification('New signal received', {
                icon: '/logo.v2.192.png',
                body: body,
                data: 'Trader Signal',
                vibrate: [200, 100, 200],
                timestamp: moment(time).valueOf(),
                tag: moment(time).valueOf(),
            })
        })
    }

    const isNotificationSupported = () =>
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window

    const showAllowNotifyAlert = () => {
        if (isNotificationSupported() && Notification.permission === 'granted') return
        enqueueSnackbar("Do you want receive notification when arrive signal?", {
            variant: 'info',
            persist: true,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            },
            preventDuplicate: true,
            action: (snackbarId) => {
                return <Button
                    color="inherit"
                    size="small"
                    children="Yes"
                    onClick={() => {
                        closeSnackbar(snackbarId)

                        if (isNotificationSupported() && Notification.permission !== 'granted') Notification.requestPermission()
                        else audioPlayer.current.load()
                    }}
                />
            }
        })
    }




    const playNotifySound = (muted = false) => {
        const audioRef = audioPlayer.current;
        audioRef.muted = muted
        audioRef.play()
            .then(_ => { })
            .catch(error => {
                showAllowNotifyAlert()
            });
    }

    const inAppNotification = (body) => {
        enqueueSnackbar(<Typography><b>New Signal: </b>{body}</Typography>, { variant: 'info', })
        playNotifySound()
    }

    const newSignalNotify = (data) => {
        const m = data.description.split(",")
        const body = " 💰" + data.title + " 🎯 " + m[0] + " ⏳ " + m[1];
        if (isNotificationSupported() && Notification.permission === 'granted') {
            nativeNotification(body, data.created_datetime)
        }
        else {
            inAppNotification(body)
        }
    }


    const getSignalsAlertList = async () => {

        if (!user) return
        if (!user.broker) return

        try {
            const response = await API.GET(true)('notice/signal/?broker=' + user.broker + '&per=25')
            dispatch({ type: 'SIGNAL_LIST', payload: { signalsList: response.data.results } })
        } catch (error) {
            enqueueSnackbar("[getsignals]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        }

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

    }

    const licenseDigOpen = useSelector(state => state.panel.openLicenseDialog)






    if (!user) return null;

    return <Box sx={{ mb: 7 }}>
        <AppBar />
        <Box component="main" sx={{ p: 3, }} >
            <Switch>
                <Route path="/news/:news_id" component={NewsSingle} />
                <Route path="/news" exact component={News} />

                <Route path="/support" exact component={Support} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        </Box>
        <BottomNavigationMenu />
        <audio ref={audioPlayer} src={"/static/audio/notify.wav"} muted />
        <LicensesDialog
            {...{
                open: licenseDigOpen,
                handleClose: () => dispatch({ type: 'LICENSE_OPEN', payload: { open: false } })
            }}
        />
    </Box>
}
export default Panel;