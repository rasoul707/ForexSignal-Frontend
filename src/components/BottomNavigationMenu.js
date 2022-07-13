import { useLocation, useHistory } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const BottomNavigationMenu = () => {

    const location = useLocation()
    const history = useHistory()

    const val = location.pathname.split("/")[1];
    return <>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels={true}
                value={val}
                onChange={(event, newValue) => history.push("/" + newValue)}

            >
                {/* home */}
                <BottomNavigationAction
                    label="Home"
                    value=""
                    icon={<HomeRoundedIcon />}
                    style={{ color: val !== "" && "#0b7f2a" }}

                />
                {/* articles */}
                <BottomNavigationAction
                    label="News"
                    value="news"
                    icon={<ArticleRoundedIcon />}
                    style={{ color: val !== "news" && "#12595f" }}
                />
                {/* ticket & learning */}
                <BottomNavigationAction
                    label="Support"
                    value="support"
                    icon={<ContactSupportRoundedIcon />}
                    style={{ color: val !== "support" && "#e06311" }}
                />
                {/* user edit .... */}
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<AccountCircleRoundedIcon />}
                    style={{ color: val !== "profile" && "#12595f" }}
                />

            </BottomNavigation>

        </Paper>

    </>
}

export default BottomNavigationMenu;