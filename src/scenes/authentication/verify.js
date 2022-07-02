import { TextField, Button, Typography, Grid, Card, Alert } from "@mui/material"
import { useState } from "react";
import Logo from "../../components/Logo"
import * as api from "../../api";
import { useSnackbar } from 'notistack';


const Verify = () => {

    const { enqueueSnackbar } = useSnackbar()

    const [email, setEmail] = useState(localStorage.getItem('Verify_EmailAddress'));

    const [canChangeEmail, setCanChangeEmail] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendAgain = () => {

    }

    const changeEmail = async () => {
        setDisabled(true)
        setLoading(true)
        setCanChangeEmail(false)




    }





    return (
        <Card sx={{ width: 300, padding: 7, margin: "50px auto" }}>
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
                    onClick={sendAgain}
                    disabled={disabled}
                    loading={loading}
                />}

            </Grid>
        </Card>
    );


}
export default Verify; 