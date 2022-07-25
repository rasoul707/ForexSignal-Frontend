
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button } from '@mui/material';
import moment from "moment"
import { useHistory, } from "react-router-dom";



const LicenseAlert = ({ dialogMode }) => {
    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();

    const { license, license_expire } = user
    const expiration = moment(license_expire).diff(moment())
    const fromNow = moment(license_expire).fromNow()


    const openLicenseDig = () => {
        dispatch({ type: 'LICENSE_OPEN', payload: { open: true } })
    }

    const openSupport = () => {
        history.push("/support")
    }

    if (!license) {
        return [
            <Alert
                severity="error"
                sx={{ mb: 2 }}
                action={
                    dialogMode ??
                    <Button color="inherit" size="small" onClick={openLicenseDig} children="Buy license" />
                }
                children="Your don't have any license"
            />,
            <Alert
                severity="info"
                sx={{ mb: 2 }}
                action={
                    <Button color="inherit" size="small" onClick={openSupport} children="Support" />
                }
                children="For demo, contact support!"
            />
        ]
    }
    else if (license.is_trial) {
        if (expiration <= 0) {
            return <Alert
                severity="error"
                sx={{ mb: 2 }}
                children={"Your trial license expired " + fromNow}
                action={
                    dialogMode ?? <Button color="inherit" size="small" onClick={openLicenseDig} children="Buy license" />
                }
            />
        }
        else {
            return <Alert
                severity="info"
                sx={{ mb: 2 }}
                children={"Your trial license will expire " + fromNow}
                action={
                    dialogMode ?? <Button color="inherit" size="small" onClick={openLicenseDig} children="Buy license" />
                }
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
            action={
                dialogMode ?? <Button color="inherit" size="small" onClick={openLicenseDig} children="Buy license" />
            }
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