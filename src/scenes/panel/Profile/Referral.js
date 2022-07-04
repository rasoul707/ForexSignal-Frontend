
import * as React from 'react';
import { Card, FormControl, InputLabel, Input, InputAdornment, IconButton, CardContent, Typography, CardHeader, } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useSelector } from "react-redux";
import ContentCopy from '@mui/icons-material/ContentCopy';
import { getReferralLink } from "../../../helpers/constants"



const Referral = () => {

    const user = useSelector(state => state.auth.user)
    const { enqueueSnackbar, } = useSnackbar()



    return <Card>
        <CardHeader subheader="Referral" />
        <CardContent>
            <FormControl sx={{}} variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Your link</InputLabel>
                <Input
                    label="Your link"
                    variant="standard"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                    type="text"
                    fullWidth
                    value={getReferralLink(user.token)}
                    readOnly
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(getReferralLink(user.token))
                                        .then(() => {
                                            enqueueSnackbar("Your referral link copied in clipboard", { variant: 'success' })
                                        })
                                        .catch(() => {
                                            enqueueSnackbar("Your referral link copied in clipboard", { variant: 'error' })
                                        });
                                }}
                                size="small"
                            >
                                <ContentCopy fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Typography>
                You invited: {user.referrals.length}
            </Typography>

        </CardContent>
    </Card>
}

export default Referral