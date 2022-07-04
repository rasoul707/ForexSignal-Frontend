
import * as React from 'react';
import { Card, Button, CardContent, Dialog, Slide, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import * as API from "../../../api";
import { useHistory } from "react-router-dom"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const LogoutDialog = ({ open, handleClose, }) => {


    const history = useHistory()



    const logout = async () => {
        handleClose()
        await API.POST(true)('auth/logout/')
        localStorage.clear()
        history.replace('/auth/signin/')
    }



    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}

    >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent sx={{ minWidth: 250 }}>
            <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={logout}>Yes!</Button>
        </DialogActions>
    </Dialog>

}







const Logout = () => {

    const [openDialogLogout, setDialogLogoutOpen] = React.useState(false)

    return <Card>

        <CardContent>


            <Button
                variant="contained"
                size="large"
                children="Logout"
                color='error'
                onClick={() => setDialogLogoutOpen(true)}
            />

            <LogoutDialog open={openDialogLogout} handleClose={() => setDialogLogoutOpen(false)} />

        </CardContent>
    </Card>
}

export default Logout