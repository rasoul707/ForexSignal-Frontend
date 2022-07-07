import * as React from "react"

import Layout from "../../../components/Layout"
import { Grid, } from '@mui/material';
import NewTicket from "./NewTicket"
import TicketsList from "./TicketsList"


const Page = () => {

    const layout = React.useRef(null)

    const crisp = () => {


    }

    React.useEffect(() => {
        crisp()
    })

    return <Layout ref={layout} />
}
export default Page