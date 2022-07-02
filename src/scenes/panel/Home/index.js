import * as React from 'react';
import { Grid, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { LoadingButton } from "@mui/lab"

import { useSelector } from "react-redux";
import ChooseBroker from './ChooseBroker';
import SignalsList from './SignalsList';


const Page = () => {
    const user = useSelector(state => state.auth.user)

    if (user.broker) return <SignalsList />
    else return <ChooseBroker />
}
export default Page