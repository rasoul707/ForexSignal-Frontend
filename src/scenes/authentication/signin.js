import * as React from "react"
import { TextField, Button, Typography, Grid, Card } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import { Link as LinkRoute } from "react-router-dom"
import { useState } from "react";
import Logo from "../../components/Logo"
import * as API from "../../api";
import { useSnackbar } from 'notistack';
import validex from 'validex'


const SignIn = () => {

    const { enqueueSnackbar } = useSnackbar()

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    React.useEffect(() => {
        localStorage.clear()
    }, [])

    const submit = async () => {

        const data = {
            username: email,
            password: password
        }
        const schema = {
            username: {
                nameAlias: "Email",
                required: true,
                type: 'string',
                email: true,
            },
            password: {
                nameAlias: "Password",
                required: true,
                type: 'string'
            },
        }

        const validator = validex(data, schema)
        const isValidate = validator.validate()

        if (!isValidate) {
            const errors = validator.getError()
            return enqueueSnackbar(Object.values(errors)[0], { variant: "error" })
        }

        setDisabled(true)
        setLoading(true)

        try {
            const response = await API.POST(false)('auth/login/', data)
            setLoading(false)

            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            enqueueSnackbar("Welcome :) Please wait...", { variant: 'success' })

            setTimeout(() => {
                window.location.reload();
            }, 1000)

        } catch (error) {
            enqueueSnackbar("[signIn]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
            setDisabled(false)
            setLoading(false)
        }

    }

    return (
        <Card sx={{ width: 300, padding: 7, margin: "50px auto" }}>
            <Grid container direction="column">
                <Logo />
                <Typography align="center" variant="h6" style={{ color: "#4e4e4e" }}>Sign in</Typography>
                <TextField
                    label="Email"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    autoComplete="true"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    disabled={disabled}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    autoComplete="true"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    disabled={disabled}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                />
                <LoadingButton
                    variant="contained"
                    size="large"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    children="Login"
                    onClick={submit}
                    disabled={disabled}
                    loading={loading}
                />
                <Button
                    component={LinkRoute}
                    to="/auth/signup"
                    size="small"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    children="Create account"
                    disabled={disabled}
                />
            </Grid>
        </Card>
    );


}
export default SignIn; 