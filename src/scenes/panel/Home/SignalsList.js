import * as React from 'react';
import { useSelector, } from "react-redux";

import { Grid, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Alert } from '@mui/material';



const SignalsList = () => {


    const signalsList = useSelector(state => state.panel.signalsList)

    if (!signalsList) return null

    if (signalsList.length === 0) return <>
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
        <Grid container justifyContent="center">
            <Grid item lg={6} md={8} sm={10} xs={12}>
                <List sx={{ bgcolor: 'background.paper' }}>
                    {signalsList.map(({ title, description, image, broker }, index) => {
                        return <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={title} src={image?.thumbnail || "/no-avatar"} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={title}
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
                            {(index + 1 !== signalsList.length) ? < Divider variant="inset" component="li" /> : null}
                        </>
                    })}
                </List>
            </Grid>
        </Grid>
    </>

}


export default SignalsList