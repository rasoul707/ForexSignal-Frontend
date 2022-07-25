
import * as React from 'react';
import { Grid, } from '@mui/material';

import Layout from "../../../components/Layout"
import EditProfile from './EditProfile';
import Referral from './Referral';
import License from './License';
import Logout from './Logout';
import ChooseBroker from '../Home/ChooseBroker';



const Page = () => {


    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)



    return <Layout>
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <EditProfile {...{ disabled, loading, setDisabled, setLoading }} />
            </Grid>

            <Grid item xs={12}>
                <ChooseBroker />
            </Grid>

            <Grid item xs={12}>
                <Referral />
            </Grid>

            <Grid item xs={12}>
                <License />
            </Grid>

            <Grid item xs={12}>
                <Logout />
            </Grid>

        </Grid>
    </Layout>
}
export default Page