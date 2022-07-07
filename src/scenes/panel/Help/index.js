import * as React from "react"

import Layout from "../../../components/Layout"

import { CircularProgress, } from '@mui/material';


const Page = () => {

    return <Layout >
        <CircularProgress />
        <iframe
            title="help"
            src="/chat.html"
            style={{
                width: "100%",
                height: "calc(100vh - 64px - 56px - 52px)",
                border: "none",
            }} />
    </Layout>
}
export default Page