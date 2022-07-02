/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Grid, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Avatar } from '@mui/material';
import { LoadingButton } from "@mui/lab"

import * as API from "../../../api";
import { useSnackbar } from 'notistack';


const ChooseBroker = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const { enqueueSnackbar, } = useSnackbar()

    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [broker, setBroker] = React.useState(user.broker || "none")

    const [brokersList, setBrokersList] = React.useState([])

    React.useEffect(() => {
        const data = async () => {
            setDisabled(true)
            try {
                const response = await API.GET(true)('notice/broker/')
                setBrokersList(response.data)
            } catch (error) {
                enqueueSnackbar("[getbrokerlist]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
            }
            setDisabled(false)
        }
        data()
    }, [])

    const choose = async () => {
        const data = { broker }
        setDisabled(true)
        setLoading(true)
        try {
            const response = await API.PATCH(true)('auth/user/', data)
            enqueueSnackbar("Successfully", { variant: 'success' })
            dispatch({ type: 'USER_INFO', payload: { user: response.data } })
        } catch (error) {
            enqueueSnackbar("[setbroker]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        }
        setDisabled(false)
        setLoading(false)
    }


    return <>
        <Grid container justifyContent="center" >
            <Grid item lg={6} md={8} sm={10} xs={12}>
                <Card>

                    <CardContent>
                        <Typography>
                            Choose broker:
                        </Typography>
                        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                            <InputLabel>Broker</InputLabel>
                            <Select
                                label="Broker"
                                variant='outlined'

                                value={brokersList.length === 0 ? "none" : broker}
                                onChange={(e) => { setBroker(e.target.value) }}
                                disabled={disabled}
                            >
                                <MenuItem value="none" disabled><em>None</em></MenuItem>
                                {brokersList.map(({ id, name, logo }) => <MenuItem value={id}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item><Avatar alt={name} src={logo.thumbnail || "/no-avatar"} sx={{ width: 25, height: 25 }} /></Grid>
                                        <Grid item>{name}</Grid>
                                    </Grid>
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                        <LoadingButton
                            variant="contained"
                            size="large"
                            children="Choose"
                            onClick={choose}
                            disabled={disabled}
                            loading={loading}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>

}


export default ChooseBroker