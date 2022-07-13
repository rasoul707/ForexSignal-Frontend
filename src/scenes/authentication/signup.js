/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { TextField, Button, Checkbox, FormControlLabel, Typography, Grid, Card, Link } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import { Link as LinkRoute, useHistory } from "react-router-dom"
import { useState } from "react";
import Logo from "../../components/Logo"
import * as API from "../../api";
import { useSnackbar } from 'notistack';
import validex from 'validex'
import TermsDialog from "../../components/TermsDialog"


const SignUp = () => {

    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openDialogTerms, setOpenDialogTerms] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [refToken, setRefToken] = useState('');


    React.useEffect(() => {
        setRefToken(localStorage.getItem('ref'))
    }, [])

    const submit = async () => {

        if (!acceptTerms) {
            return enqueueSnackbar("You must accept terms", { variant: "error" })
        }



        const data = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password1: password,
            password2: password,
            ref: refToken
        }
        const schema = {
            first_name: {
                nameAlias: "First Name",
                required: true,
                type: 'string',
                min: 3,
            },
            last_name: {
                nameAlias: "Last Name",
                required: true,
                type: 'string',
                min: 3,
            },
            username: {
                nameAlias: "Username",
                required: true,
                type: 'string',
                min: 3,
            },
            email: {
                nameAlias: "Email",
                required: true,
                type: 'string',
                email: true,
            },
            password1: {
                nameAlias: "Password",
                required: true,
                type: 'string',
                mediumPassword: true,
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
            await API.POST(false)('auth/register/', data)
            enqueueSnackbar("Good, now you can login", { variant: 'success' })
            setLoading(false)

            // localStorage.setItem('VERIFICATIONEMAILADDRESS', email)
            history.push('/auth/signin/')
        } catch (error) {
            enqueueSnackbar("[signUp]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
            setDisabled(false)
            setLoading(false)
        }
    }

    return (
        <Card sx={{ maxWidth: 300, padding: 7, margin: "50px auto" }}>
            <Grid container direction="column">
                <Logo />
                <Typography align="center" variant="h6">Sign up</Typography>
                <TextField
                    label="First name"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                    disabled={disabled}
                />
                <TextField
                    label="Last name"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                    disabled={disabled}
                />
                <TextField
                    label="Username"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    disabled={disabled}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    disabled={disabled}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    disabled={disabled}
                />
                <FormControlLabel
                    label={<>
                        I agree to all <Link component={LinkRoute} to="#" onClick={() => setOpenDialogTerms(true)}>terms and conditions.</Link>
                    </>}
                    control={<Checkbox />}
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    disabled={disabled}

                />
                <LoadingButton
                    variant="contained"
                    size="large"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    children="Sign Up"
                    onClick={submit}
                    disabled={disabled}
                    loading={loading}
                />
                <Button
                    component={LinkRoute}
                    to="/auth/signin"
                    size="small"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    children="Sign in instead"
                    disabled={disabled}
                />
            </Grid>
            <TermsDialog
                {...{
                    open: openDialogTerms,
                    handleClose: () => setOpenDialogTerms(false)
                }}
            />
        </Card>
    );


}
export default SignUp; 