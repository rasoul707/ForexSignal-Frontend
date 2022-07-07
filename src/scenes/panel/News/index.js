/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Grid, List, ListItem, ListItemButton, Typography, Alert, Skeleton, Avatar, } from '@mui/material';

import Layout from "../../../components/Layout"
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import * as API from "../../../api";
import { useSnackbar } from 'notistack';
import moment from "moment"
import { useHistory, } from 'react-router-dom';
import PaginationNav from "../../../components/Pagination"




const Page = () => {

    // const [, setRefreshTime] = React.useState([true])





    const newsList = useSelector(state => state.panel.newsList)
    const { enqueueSnackbar, } = useSnackbar()
    const dispatch = useDispatch()


    const MAX_PER_PAGE = 5
    React.useEffect(() => {
        // setInterval(() => {
        //     setRefreshTime([true])
        // }, 60000)
        getNewsList()
    }, [])

    const [count, setCount] = React.useState(0)
    const getNewsList = async (current = 1) => {
        try {
            const response = await API.GET(true)(`news/news/?p=${current}&per=${MAX_PER_PAGE}`)
            dispatch({ type: 'NEWS_LIST', payload: { newsList: response.data?.results } })
            setCount(response.data?.count)
        } catch (error) {
            enqueueSnackbar("[getnews]: ".toUpperCase() + JSON.stringify(error?.data?.message), { variant: 'error' })
        }
    }


    if (!newsList) return <Layout>
        <List sx={{ p: 0 }} key={-95}>
            <NewsItem isLoading key={"retR4531"} />
            <NewsItem isLoading key={"retR4580"} />
            <NewsItem isLoading key={"retR4598"} />
        </List>
    </Layout>
    if (newsList.length === 0) return <Layout>
        <Alert severity='error'>
            <Typography>
                No News Found yet
            </Typography>
        </Alert>
    </Layout>

    return <Layout>
        <List sx={{ p: 0 }} key={-95}>
            {newsList.map((data, index) => (
                <NewsItem {...data} isLast={index + 1 < newsList.length} key={data.id} />
            ))}
        </List>


        <PaginationNav count={count} max={MAX_PER_PAGE} runner={getNewsList} />

    </Layout>
}







const NewsItem = ({ id, title, excerpt, image, created_datetime, isLoading }) => {

    const history = useHistory()


    return <ListItem
        alignItems="flex-start"
        sx={{ p: 0, bgcolor: 'background.paper', overflow: 'hidden', mb: 2 }}
    >
        <ListItemButton sx={{ p: 2, }} disabled={isLoading} onClick={() => history.push('/news/' + id)}>
            <Grid container alignItems="stretch" justifyContent="center" columnGap={2} rowGap={2}>
                <Grid item>
                    {isLoading
                        ?
                        <Skeleton animation="wave" variant='rectangular' width={128} height={128} />
                        :
                        <Avatar alt={title} src={image?.medium} sx={{ width: 128, height: 128 }} variant="rounded" >No Photo</Avatar>
                    }
                </Grid>

                <Grid item xs={12} sm sx={{ position: 'relative' }}>
                    <Grid container direction="column" spacing={0} >

                        <Grid item xs="auto">
                            <Typography gutterBottom variant="subtitle2" component="div">
                                {isLoading
                                    ?
                                    <Skeleton animation="wave" variant='text' />
                                    :
                                    title
                                }
                            </Typography>
                        </Grid>

                        <Grid item xs={10} >
                            <Typography variant="body2" gutterBottom>
                                {isLoading
                                    ?
                                    [
                                        <Skeleton animation="wave" variant='text' key={0} />,
                                        <Skeleton animation="wave" variant='text' key={1} />,
                                        <Skeleton animation="wave" variant='text' key={2} />,
                                    ]
                                    :
                                    excerpt
                                }
                            </Typography>
                        </Grid>



                        <Grid item container xs="auto" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                            {isLoading ? null : <AccessTimeIcon color='action' sx={{ pr: 1 }} />}
                            <Typography variant="body2" color="text.secondary">
                                {isLoading
                                    ?
                                    <Skeleton animation="wave" variant='text' width={100} />
                                    :
                                    moment(created_datetime).fromNow()
                                }
                            </Typography>
                        </Grid>


                    </Grid>

                </Grid>


            </Grid>
        </ListItemButton>
    </ListItem >
}







export default Page