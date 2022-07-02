import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar"
import BottomNavigationMenu from "../../components/BottomNavigationMenu"
import { Box } from "@mui/material"

import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import queryString from "query-string";

// import NewSoftware from "./NewSoftware"
// import Softwares from "./Softwares"
// import Evaluations from "./Evaluations"

import Home from "./Home"
import Articles from "./Articles"
import Help from "./Help"
import Profile from "./Profile"
// import Settings from "./Settings"



const Panel = () => {

    const history = useHistory()
    const location = useLocation();
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.ref) {
            if (user) history.replace("/")
            else localStorage.setItem('ref', parsed.ref)
        }
        if (!user) history.replace("/auth")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    if (!user) return null;
    return <Box>
        <AppBar />
        <Box component="main" sx={{ p: 3, }} >
            <Switch>
                <Route path="/articles" component={Articles} />
                <Route path="/help" component={Help} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} />

                <Redirect to="/" />
            </Switch>
        </Box>
        <BottomNavigationMenu />


    </Box>


}
export default Panel;