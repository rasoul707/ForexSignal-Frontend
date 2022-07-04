
import { useSelector } from "react-redux";
import { Alert, Button } from '@mui/material';
import { useHistory } from "react-router-dom";

import moment from "moment"



const LicenseAlert = () => {
    const user = useSelector(state => state.auth.user)
    const history = useHistory()

    const { license, license_expire } = user
    const expiration = moment(license_expire).diff(moment())
    const fromNow = moment(license_expire).fromNow()



    if (!license) {
        return <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
                <Button color="inherit" size="small" onClick={() => { history.push("/profile/license") }}>
                    Buy license
                </Button>
            }
            children="Your don't have any license"
        />
    }
    else if (license.is_trial) {
        if (expiration <= 0) {
            return <Alert
                severity="error"
                sx={{ mb: 2 }}
                children={"Your trial license expired" + fromNow}
                action={<Button color="inherit" size="small" onClick={() => { history.push("/profile/license") }} children="Buy license" />}
            />
        }
        else {
            return <Alert
                severity="info"
                sx={{ mb: 2 }}
                children={"Your trial license will expire " + fromNow}
                action={<Button color="inherit" size="small" onClick={() => { history.push("/profile/license") }} children="Buy license" />}
            />
        }
    }
    else if (license.unlimited) {
        return <Alert
            severity="success"
            sx={{ mb: 2 }}
            children="You have Full license unlimited"
        />
    }
    else if (expiration <= 0) {
        return <Alert
            severity="error"
            sx={{ mb: 2 }}
            children={"Your license expired " + fromNow}
            action={<Button color="inherit" size="small" onClick={() => { history.push("/profile/license") }} children="Buy license" />}
        />
    }


    return null
}


export default LicenseAlert



export const haveLicense = (user) => {
    const { license, license_expire } = user
    const expiration = moment(license_expire).diff(moment())
    if (!license) return false
    if (license.unlimited) return true
    if (expiration > 0) return true
    return false
}