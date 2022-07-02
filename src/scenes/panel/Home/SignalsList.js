import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Grid, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Alert, CardContent } from '@mui/material';

import * as API from "../../../api";
import { useSnackbar } from 'notistack';


const SignalsList = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const { enqueueSnackbar, } = useSnackbar()

    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [signalList, setSignalList] = React.useState([])


    React.useEffect(() => {
        const data = async () => {
            try {
                const response = await API.GET(true)('notice/signal/?broker=' + user.broker)
                setSignalList(response.data)
            } catch (error) {
                enqueueSnackbar("[getSignalList]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
            }
        }
        data()
    }, [])

    if (signalList.length === 0) return <>
        <Grid container justifyContent="center" >
            <Grid item lg={6} md={8} sm={10} xs={12}>
                <Alert severity='error'>
                    <Typography>
                        No Signal Found yet
                    </Typography>
                </Alert>

            </Grid>
        </Grid>
    </>

    return <>
        <Grid container justifyContent="center" >
            <Grid item lg={6} md={8} sm={10} xs={12}>
                <List sx={{ bgcolor: 'background.paper', mb: 7 }}>
                    {signalList.map(({ title, description, image, broker }, index) => {
                        return <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={title} src={image.thumbnail || "/no-avatar"} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {broker.name}
                                            </Typography>
                                            {" — Only 2.5% of the budget"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {(index + 1 !== signalList.length) ? < Divider variant="inset" component="li" /> : null}
                        </>
                    })}



                </List>
            </Grid>
        </Grid>
    </>

}


export default SignalsList