import * as React from "react"

import Layout from "../../../components/Layout"



const Page = () => {

    return <Layout >
        <iframe
            title="help"
            src="/chat.html"
            style={{
                width: "100%",
                height: "calc(100vh - 64px - 56px - 24px)",
                border: "none",
            }} />
    </Layout>
}
export default Page