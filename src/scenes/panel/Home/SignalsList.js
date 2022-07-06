import * as React from 'react';
import { useSelector, } from "react-redux";

import { Grid, List, ListItem, ListItemText, Typography, Alert, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import moment from "moment"


const SignalsList = () => {
    const [, setRefreshTime] = React.useState([true])
    const signalsList = useSelector(state => state.panel.signalsList)


    React.useEffect(() => {
        setInterval(() => {
            setRefreshTime([true])
        }, 60000)
    }, [])


    if (!signalsList) return null
    if (signalsList.length === 0) return <>
        <Alert severity='error'>
            <Typography>
                No Signal Found yet
            </Typography>
        </Alert>
    </>

    return <List sx={{ bgcolor: 'background.paper', p: 0 }} key={-95}>
        <TransitionGroup >
            {signalsList.map((data, index) => (
                <Collapse key={index} >
                    <SignalItem {...data} isLast={index + 1 < signalsList.length} />
                </Collapse>
            ))}
        </TransitionGroup>

    </List>



}


export default SignalsList







const SignalItem = ({ title, description, broker, created_datetime, isLast }) => {
    let direction
    let timeFrame
    let backgroundColor
    const detail = description.split(",")
    if (detail.length !== 2) {
        direction = null
        timeFrame = '~'
        backgroundColor = '#FFF'
    }
    else {
        direction = detail[0]
        timeFrame = detail[1]
        if (direction === 'Buy') {
            backgroundColor = 'rgb(12 143 19 / 62%)'
        } else {
            backgroundColor = 'rgb(185 15 15 / 62%)'
        }
    }



    return <ListItem
        alignItems="flex-start"
        divider={isLast}
        sx={{ pr: 2, overflow: 'hidden', backgroundColor }}
    >
        <Grid container flexDirection="row" alignItems="center">

            <Grid container flexDirection="column" xs zeroMinWidth>
                <Grid item>
                    <ListItemText
                        primary={title}
                        secondary={timeFrame + ' - ' + direction}
                        secondaryTypographyProps={{ sx: { overflowWrap: "anywhere" } }}
                    />
                </Grid>
                <Grid item>
                    <ListItemText
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    children={broker.name}
                                />
                                {" — Only 2.5% of the budget"}
                            </React.Fragment>
                        }
                    />
                </Grid>
            </Grid>

            <Grid item xs="auto">
                <Typography
                    sx={{ display: 'inline', pl: 1 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    children={moment(created_datetime).fromNow()}
                />
            </Grid>
        </Grid>
    </ListItem>
}
