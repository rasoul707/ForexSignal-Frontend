/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { Card, Button, CardContent, CardActionArea, Typography, Dialog, DialogTitle, DialogContent, Grid, DialogActions, Slide, Alert, } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as API from "../api";
import { Link as LinkRoute } from 'react-router-dom';
import LicenseAlert from "./LicenseAlert";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const LicensePlanItem = ({ id, title, price, duration, unlimited, buy, index }) => {
    return <Card sx={{ backgroundColor: "#ff9800", height: '100%', minWidth: 200 }} >
        <CardActionArea sx={{ height: '100%', }} onClick={buy ? () => buy(index) : null} disabled={!buy}>
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
    </Card >

}

const LicensesDialog = ({ open, handleClose, }) => {

    const [licenseList, setLicenseList] = React.useState([])
    const { enqueueSnackbar, } = useSnackbar()
    const [payDescription, setPayDescription] = React.useState("")
    const [planSelected, setPlanSelected] = React.useState(null)


    const closeDig = () => {
        setPlanSelected(null)
        handleClose();
    }


    React.useEffect(() => {
        const data = async () => {
            try {
                const response = await API.GET(true)('license/license/')
                setLicenseList(response.data)
            } catch (error) {
                enqueueSnackbar("[getlicense]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
                closeDig()
            }
            try {
                const response = await API.GET(false)('setting/setting/')
                setPayDescription(response.data[0].pay_description)
            } catch (error) {
                enqueueSnackbar("[pay_description]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
                closeDig()
            }
        }
        data()
    }, [open])

    const buy = (planID) => {
        setPlanSelected(planID)
    }




    const _ChoosePlan = <>
        <DialogTitle>Choose plan</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
            <LicenseAlert dialogMode />
            <Alert
                severity="info"
                sx={{ mb: 2 }}
                children={"Choose a plan 😄"}
            />
            <Grid container spacing={2} alignItems="stretch" justifyContent="center">
                {licenseList.map((data, index) => {
                    return <Grid item md={6} xs={12}>
                        <LicensePlanItem key={index} {...data} buy={buy} index={index} />
                    </Grid>
                })}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDig}>Cancel</Button>
        </DialogActions>
    </>

    const _BuyPlan = <>
        <DialogTitle>Pay</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>

            <LicensePlanItem key={planSelected} {...licenseList[planSelected]} />

            <Typography sx={{ mt: 2 }}>
                {payDescription}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button to="/support" onClick={closeDig} component={LinkRoute}>Contact support</Button>
            <Button onClick={closeDig} >Cancel</Button>
        </DialogActions>
    </>

    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDig}
    >
        {planSelected !== null ? _BuyPlan : _ChoosePlan}
    </Dialog>

}

export default LicensesDialog