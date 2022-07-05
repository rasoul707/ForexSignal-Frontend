import { useLocation, useHistory } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const BottomNavigationMenu = () => {

    const location = useLocation()
    const history = useHistory()


    return <>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels={true}
                value={location.pathname.split("/")[1]}
                onChange={(event, newValue) => history.push("/" + newValue)}
            >
                {/* home */}
                <BottomNavigationAction
                    label="Home"
                    value=""
                    icon={<HomeRoundedIcon />}
                />
                {/* articles */}
                <BottomNavigationAction
                    label="News"
                    value="news"
                    icon={<ArticleRoundedIcon />}
                />
                {/* ticket & learning */}
                <BottomNavigationAction
                    label="Help"
                    value="help"
                    icon={<ContactSupportRoundedIcon />}
                />
                {/* user edit .... */}
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<AccountCircleRoundedIcon />}
                />

            </BottomNavigation>

        </Paper>

    </>
}

export default BottomNavigationMenu;