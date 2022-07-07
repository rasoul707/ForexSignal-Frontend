import * as React from "react"

import Layout from "../../../components/Layout"
import { Grid, } from '@mui/material';
import NewTicket from "./NewTicket"
import TicketsList from "./TicketsList"
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

const Page = () => {

    const layout = React.useRef(null)

    const crisp = () => {
        //         <iframe src="/chat.html" style="
        //     width: 100%;
        //     height: calc(100vh - 64px - 56px - 24px);
        //     border: none;
        // "></iframe>

    }

    React.useEffect(() => {
        crisp()
    })

    return <Layout >
        <LiveChatWidget
            license="14293815"
            visibility="maximized"
        // onNewEvent={handleNewEvent}
        />
    </Layout>
}
export default Page