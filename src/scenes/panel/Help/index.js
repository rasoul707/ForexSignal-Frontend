import Layout from "../../../components/Layout"
import { Grid, } from '@mui/material';
import NewTicket from "./NewTicket"
import TicketsList from "./TicketsList"


const Page = () => {
    return <Layout>
        <Grid
            container
            spacing={2}
        >

            <Grid item xs={12}>
                <TicketsList />
            </Grid>

            <Grid item xs={12}>
                <NewTicket />
            </Grid>



        </Grid>
    </Layout>
}
export default Page