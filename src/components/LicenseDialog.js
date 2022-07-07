/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { Card, Button, CardContent, CardActionArea, Typography, Dialog, DialogTitle, DialogContent, Grid, DialogActions, Slide } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as API from "../api";
import { useHistory } from 'react-router-dom';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const LicensePlanItem = ({ id, title, price, duration, unlimited, buy }) => {
    return <Grid item md={6} xs={12}>
        <Card sx={{ backgroundColor: "#ff9800", height: '100%', minWidth: 200 }} >
            <CardActionArea sx={{ height: '100%', }} onClick={() => buy(id)}>
                <Grid container sx={{ height: '100%', }} justifyContent="space-between" flexDirection="column" >
                    <Grid item flex={1}>
                        <CardContent >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant='button'>
                                {title}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                                {unlimited ? "Unlimited" : duration + " days"}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item>
                        <CardContent sx={{ backgroundColor: "rgb(199 199 199)", p: '8px !important' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" variant='button'>
                                {price + " $"}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    </Grid>
}

const LicensesDialog = ({ open, handleClose, }) => {

    const [licenseList, setLicenseList] = React.useState([])
    const { enqueueSnackbar, } = useSnackbar()
    const history = useHistory()

    React.useEffect(() => {
        const data = async () => {
            try {
                const response = await API.GET(true)('license/license/')
                setLicenseList(response.data)
            } catch (error) {
                enqueueSnackbar("[getlicense]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
                handleClose()
            }
        }
        data()
    }, [])

    const buy = (planID) => {
        handleClose()
        history.push("/help?license=" + planID)
    }



    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
    >
        <DialogTitle>Choose plan</DialogTitle>
        <DialogContent>
            <Grid container spacing={2} alignItems="stretch" justifyContent="center">
                {licenseList.map((data, index) => <LicensePlanItem key={index} {...data} buy={buy} />)}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>

}

export default LicensesDialog