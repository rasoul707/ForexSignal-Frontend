import * as React from "react"
import { TextField, Button, Typography, Grid, Card, Alert } from "@mui/material"
import { useState } from "react";
import Logo from "../../components/Logo"
// import * as api from "../../api";
// import { useSnackbar } from 'notistack';
// import { useHistory, useLocation } from "react-router-dom"
// import queryString from "query-string";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const Verify = () => {

    // const history = useHistory()
    // const location = useLocation()

    const [verifyStatus, setVerifyStatus] = React.useState('FailedVerify')

    const [email, setEmail] = useState(localStorage.getItem('VERIFICATIONEMAILADDRESS'));

    const [canChangeEmail, setCanChangeEmail] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const sendEmail = () => {

    }

    const changeEmail = async () => {
        setDisabled(true)
        setLoading(true)
        setCanChangeEmail(false)

        // const oldEmail = localStorage.getItem('VERIFICATIONEMAILADDRESS')
        // const newEmail = email

    }

    React.useEffect(() => {
        setVerifyStatus(null)
        // const data = async () => {
        //     if (!localStorage.getItem('VERIFICATIONEMAILADDRESS')) {
        //         history.replace("/")
        //     }

        //     const parsed = queryString.parse(location.search);
        //     if (parsed.key) {
        //         // send request to api
        //         // await API.POST(false)('auth/register/verify-email//', data)
        //     }
        //     else {

        //     }


        //     /*
        //     await API.POST(false)('auth/register/resend-email/', data)
        //     await API.POST(false)('auth/register/verify-email//', data)

        //     */
        // }



    }, [])


    if (verifyStatus === 'SuccessVerify') {
        return (
            <Card sx={{ maxWidth: 300, padding: 7, margin: "50px auto" }}>
                <Grid container direction="column">
                    <CheckOutlinedIcon color='success' sx={{ textAlign: "center", width: "100%", mb: 2, mt: 2, fontSize: 100 }} />
                    <Typography align="center" variant="body1" style={{ color: "#4e4e4e" }}>Your email verified successfully</Typography>
                </Grid>
            </Card>
        )
    }
    if (verifyStatus === 'FailedVerify') {
        return (
            <Card sx={{ maxWidth: 300, padding: 7, margin: "50px auto" }}>
                <Grid container direction="column">
                    <CloseOutlinedIcon color='error' sx={{ textAlign: "center", width: "100%", mb: 2, mt: 2, fontSize: 100 }} />
                    <Typography align="center" variant="body1" style={{ color: "#4e4e4e" }}>Verification Failed<br /> Maybe link is invalid or expired</Typography>
                </Grid>
            </Card>
        )
    }

    return (
        <Card sx={{ maxWidth: 300, padding: 7, margin: "50px auto" }}>
            <Grid container direction="column">
                <Logo />
                <Typography align="center" variant="h6" style={{ color: "#4e4e4e" }}>Verification</Typography>
                {!canChangeEmail && <Alert severity="info">Verify your email with link was sent to your address</Alert>}
                {canChangeEmail && <Alert severity="info">Enter your email address</Alert>}
                <TextField
                    label="Email"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    autoComplete="true"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    disabled={disabled || !canChangeEmail}
                />
                <Button
                    variant={canChangeEmail ? "contained" : "text"}
                    size="small"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    children={canChangeEmail ? "Change" : "Change email"}
                    onClick={() => {
                        if (canChangeEmail) changeEmail()
                        else setCanChangeEmail(true)
                    }}
                    disabled={disabled}
                    loading={loading}
                />
                {!canChangeEmail && <Button
                    size="small"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    children="Send again"
                    onClick={sendEmail}
                    disabled={disabled}
                    loading={loading}
                />}

            </Grid>
        </Card>
    );


}
export default Verify; 