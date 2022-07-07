/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Image from "../../../components/Image"
import Layout from "../../../components/Layout"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import * as API from "../../../api";
import { useHistory, useParams } from "react-router-dom";

import moment from "moment"


const Single = () => {

    const params = useParams()
    const history = useHistory()

    const [loading, setLoading] = React.useState(false)

    const [{ title, content, image, created_datetime, }, setNews] = React.useState({})

    React.useEffect(() => {
        const data = async () => {
            setLoading(true)
            const newsID = params.news_id
            try {
                const response = await API.GET(true)('news/news/' + newsID + '/')
                setNews(response.data)
            }
            catch (error) {
                history.push("/news")
            }
            setLoading(false)
        }

        data()
    }, [])


    if (loading) return null




    return <Layout>
        <Paper
            sx={{ p: 2, overflow: 'hidden', mb: 2 }}
        >

            <Grid container direction="column" spacing={2}>

                <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                </Grid>


                <Grid item>
                    {image && <Image alt={title} src={image?.file} sx={{ height: 300 }} />}
                </Grid>


                <Grid item  >
                    <Typography variant="body2" gutterBottom>
                        {content}
                    </Typography>
                </Grid>

                <Grid item container >
                    <AccessTimeIcon color='action' sx={{ pr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {moment(created_datetime).format("YYYY/MM/DD HH:mm")}
                    </Typography>
                </Grid>
            </Grid>


        </Paper >
    </Layout>
}


export default Single



