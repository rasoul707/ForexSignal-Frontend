
import * as React from 'react';
import { Card, TextField, CardContent, CardHeader, } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import * as API from "../../../api";
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from "react-redux";



const EditProfile = ({ setDisabled, setLoading, disabled, loading }) => {



    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const { enqueueSnackbar, } = useSnackbar()

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

    return <Card>
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
}

export default EditProfile