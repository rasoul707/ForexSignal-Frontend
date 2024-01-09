import * as React from 'react';
import { useSelector, } from "react-redux";

import { Grid, List, ListItem, ListItemText, Typography, Alert, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import moment from "moment"


const SignalsList = () => {
    const [, setRefreshTime] = React.useState([true])
    const signalsList = useSelector(state => state.panel.signalsList)


    React.useEffect(() => {
        setInterval(() => {
            setRefreshTime([true])
        }, 5000)
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







const SignalItem = ({ title, description, detail: content, broker, created_datetime, percent, winrate, isLast }) => {
    let direction
    let timeFrame
    const detail = description.split(",")
    let detailContent = null
    if (detail.length !== 2) {
        direction = null
        timeFrame = '~'
        detailContent = <Grid item>~</Grid>
    }
    else {
        direction = detail[0]
        timeFrame = detail[1]
        detailContent = [
            <Grid item key={1}>
                <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    children={timeFrame}
                />
            </Grid>,
            <Grid item key={2} sx={{ pl: 1, pr: 1 }}>
                <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    children="~"
                />
            </Grid>,
            <Grid item key={3}>
                <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    children={direction}
                />
            </Grid>,
            <Grid item key={4}>
                {direction === 'Buy' && <ArrowUpwardRoundedIcon htmlColor='green' />}
                {direction === 'Sell' && <ArrowDownwardRoundedIcon htmlColor='red' />}
            </Grid>
        ]

    }



    return <ListItem
        alignItems="flex-start"
        divider={isLast}
        sx={{ pr: 2, overflow: 'hidden', }}
        disabled={moment().diff(moment(created_datetime), 'seconds') > 15}
    >
        <Grid container flexDirection="row" alignItems="center">

            <Grid container item flexDirection="column" xs zeroMinWidth>
                <Grid item>
                    <ListItemText
                        primary={title}
                    />
                </Grid>
                <Grid item>
                    <Grid container>{detailContent}</Grid>
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
                                {` — Only ${percent}% of the budget`}
                            </React.Fragment>
                        }
                    />
                </Grid>
                {!!winrate && <Grid item>
                    <ListItemText
                        secondary={
                            <React.Fragment>
                                {` Win Rate: ${winrate}`}
                            </React.Fragment>
                        }
                    />
                </Grid>}
                {!!content && <Grid item>
                <ListItemText
                    secondary={
                        <React.Fragment>
                            {` Detail: ${content}`}
                        </React.Fragment>
                    }
                />
            </Grid>}
            </Grid>

            <Grid item xs="auto" sx={{ position: 'absolute', right: '20px' }}>
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
