
import * as React from 'react';
import { Card, Button, CardContent, Typography, CardHeader, } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"
import { haveLicense } from '../../../components/LicenseAlert';




const License = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()



    const { license, license_expire } = user
    const dateExpiration = moment(license_expire).format("YYYY/MM/DD HH:mm:ss")
    const expiration = moment(license_expire).diff(moment())
    const fromNow = moment(license_expire).fromNow()



    let _content = null
    if (!license) {
        _content = <Typography color="red" variant='subtitle2' sx={{ mb: 1 }}>
            You don't have any license
        </Typography>
    }
    else {
        _content = [
            <Typography variant='subtitle2' sx={{ mb: 1 }} key={0}>
                License: {license?.title}
            </Typography>
        ]

        if (license.unlimited) {
            _content.push(
                <Typography variant='subtitle2' sx={{ mb: 1 }} key={1}>
                    Unlimited
                </Typography>
            )
        } else {
            if (expiration <= 0) {
                _content.push(
                    <Typography variant='subtitle2' sx={{ mb: 1 }} key={1}>
                        License expired: {dateExpiration} ({fromNow})
                    </Typography>
                )
            } else {
                _content.push(
                    <Typography variant='subtitle2' sx={{ mb: 1 }} key={1}>
                        License deadline: {dateExpiration} ({fromNow})
                    </Typography>
                )
            }
        }
    }


    return <Card>
        <CardHeader subheader="License" />
        <CardContent>
            {_content}
            <Button
                variant="contained"
                size="large"
                children="Buy"
                onClick={() => dispatch({ type: 'LICENSE_OPEN', payload: { open: true } })}
                disabled={haveLicense(user) && !license.is_trial}
            />

        </CardContent>
    </Card >
}

export default License