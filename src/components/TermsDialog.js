/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Slide, } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as API from "../api";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const TermsDialog = ({ open, handleClose, }) => {


    const [terms, setTerms] = React.useState("")
    const { enqueueSnackbar, } = useSnackbar()


    const closeDig = () => {
        handleClose();
    }


    React.useEffect(() => {
        const data = async () => {
            try {
                const response = await API.GET(false)('setting/setting/')
                setTerms(response.data[0].terms)
            } catch (error) {
                enqueueSnackbar("[getsetting]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
                closeDig()
            }
        }
        data()
    }, [open])







    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDig}
    >
        <DialogTitle>Terms</DialogTitle>
        <DialogContent >
            <Typography>
                {terms}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDig} >Ok</Button>
        </DialogActions>
    </Dialog>

}

export default TermsDialog