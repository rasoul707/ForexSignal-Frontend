import { Grid, } from '@mui/material';



const Layout = ({ children }) => {
    return <>
        <Grid container justifyContent="center" >
            <Grid item lg={6} md={10} sm={12} xs={12}>
                {children}
            </Grid>
        </Grid>
    </>
}



export default Layout