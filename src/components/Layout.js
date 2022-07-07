import { Grid, } from '@mui/material';



const Layout = ({ children, ref }) => {
    return <>
        <Grid container justifyContent="center" >
            <Grid item lg={6} md={10} sm={12} xs={12} ref={ref}>
                {children}
            </Grid>
        </Grid>
    </>
}



export default Layout