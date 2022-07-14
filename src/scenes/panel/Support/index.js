import * as React from "react"
import Layout from "../../../components/Layout"
import { CircularProgress, Box } from '@mui/material';
import { useSelector, } from "react-redux";


const Page = () => {
    const user = useSelector(state => state.auth.user)
    return <Layout >
        <Box sx={{
            position: "relative",
            height: "calc(100vh - 64px - 56px - 52px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: 'white'
        }}>
            <CircularProgress size={20} />
            <iframe
                title="help"
                src={"https://therealrole.com:2096/chat?email=" + user.email + "&nickname=" + user.first_name + " " + user.last_name}
                style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    position: "absolute"
                }}
            />
        </Box>
    </Layout>
}
export default Page