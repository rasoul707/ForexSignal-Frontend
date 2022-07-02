
import * as React from 'react';
import { Card, TextField, Grid, CardContent, CardHeader, Typography, InputAdornment, IconButton, FormControl, InputLabel, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import ContentCopy from '@mui/icons-material/ContentCopy';

import { useSelector, useDispatch } from "react-redux";
import moment from "moment"

import * as API from "../../../api";
import { useSnackbar } from 'notistack';

import { getReferralLink } from "../../../helpers/constants"

const Page = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const { enqueueSnackbar, } = useSnackbar()

    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [first_name, setFirstName] = React.useState(user.first_name)
    const [last_name, setLastName] = React.useState(user.last_name)
    const [username, setUsername] = React.useState(user.username)

    const [email, setEmail] = React.useState(user.email)


    const submit = async () => {
        const data = {
            first_name,
            last_name
        }

        setDisabled(true)
        setLoading(true)
        try {
            const response = await API.PATCH(true)('auth/user/', data)
            enqueueSnackbar("Successfully updated", { variant: 'success' })
            dispatch({ type: 'USER_INFO', payload: { user: response.data } })
        } catch (error) {
            enqueueSnackbar("[updateprofile]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        }
        setDisabled(false)
        setLoading(false)
    }


    const buyLicense = async () => {
        // const data = {
        //     first_name,
        //     last_name
        // }

        // setDisabled(true)
        // setLoading(true)
        // try {
        //     const response = await API.PATCH(true)('auth/user/', data)
        //     enqueueSnackbar("Successfully updated", { variant: 'success' })
        //     dispatch({ type: 'USER_INFO', payload: { user: response.data } })
        // } catch (error) {
        //     enqueueSnackbar("[updateprofile]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        // }
        // setDisabled(false)
        // setLoading(false)
    }


    return <>
        <Grid container
            spacing={2}
        >
            <Grid item
                xs={12}
                md={6}
            >
                <Card>
                    <CardHeader subheader="Edit Profile" />
                    <CardContent>
                        <TextField
                            label="First name"
                            variant="standard"
                            sx={{ marginBottom: (theme) => theme.spacing(2) }}
                            type="text"
                            fullWidth
                            value={first_name}
                            onChange={(e) => { setFirstName(e.target.value) }}
                            disabled={disabled}
                        />

                        <TextField
                            label="Last name"
                            variant="standard"
                            sx={{ marginBottom: (theme) => theme.spacing(2) }}
                            type="text"
                            fullWidth
                            value={last_name}
                            onChange={(e) => { setLastName(e.target.value) }}
                            disabled={disabled}
                        />

                        <TextField
                            label="Username"
                            variant="standard"
                            sx={{ marginBottom: (theme) => theme.spacing(2) }}
                            type="text"
                            fullWidth
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            disabled={disabled || true}
                        />


                        <TextField
                            label="Email"
                            variant="standard"
                            sx={{ marginBottom: (theme) => theme.spacing(2) }}
                            type="text"
                            fullWidth
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            disabled={disabled || true}
                        />

                        <LoadingButton
                            variant="contained"
                            size="large"
                            children="Edit"
                            onClick={submit}
                            disabled={disabled}
                            loading={loading}
                        />


                    </CardContent>

                </Card>
            </Grid>


            <Grid item
                xs={12}
                md={6}
            >
                <Grid container
                    direction="column"
                    spacing={2}
                >
                    <Grid item>
                        <Card>
                            <CardHeader subheader="Referral" />
                            <CardContent>
                                <FormControl sx={{}} variant="standard" fullWidth>
                                    <InputLabel htmlFor="standard-adornment-password">Your link</InputLabel>
                                    <Input
                                        label="Your link"
                                        variant="standard"
                                        sx={{ marginBottom: (theme) => theme.spacing(2) }}
                                        type="text"
                                        fullWidth
                                        value={getReferralLink(user.token)}
                                        disabled={disabled}
                                        readOnly
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(getReferralLink(user.token))
                                                        enqueueSnackbar("Your referral link copied in clipboard", { variant: 'success' })
                                                    }}
                                                >
                                                    <ContentCopy />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <Typography>
                                    You invited: {user.referrals.length}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item>
                        <Card>
                            <CardHeader subheader="License" />
                            <CardContent>
                                <Typography color="red" variant='subtitle2' sx={{ mb: 2 }}>
                                    License expiration: {moment(user.license_expire).format("YYYY/MM/DD HH:mm:ss")}
                                </Typography>

                                <LoadingButton
                                    variant="contained"
                                    size="large"
                                    children="Buy"
                                    onClick={buyLicense}
                                    disabled={disabled}
                                />

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Grid>


        </Grid>
    </>
}
export default Page