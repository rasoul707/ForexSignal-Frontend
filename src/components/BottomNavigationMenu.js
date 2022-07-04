import { useLocation, useHistory } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';

const BottomNavigationMenu = () => {

    const location = useLocation()
    const history = useHistory()


    return <>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels={false}
                value={location.pathname.split("/")[1]}
                onChange={(event, newValue) => history.push("/" + newValue)}
            >
                {/* home */}
                <BottomNavigationAction
                    label="Home"
                    value=""
                    icon={<HomeTwoToneIcon />}
                />
                {/* articles */}
                <BottomNavigationAction
                    label="Articles"
                    value="articles"
                    icon={<ArticleTwoToneIcon />}
                />
                {/* ticket & learning */}
                <BottomNavigationAction
                    label="Help"
                    value="help"
                    icon={<HelpTwoToneIcon />}
                />
                {/* user edit .... */}
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<PermIdentityTwoToneIcon />}
                />

            </BottomNavigation>

        </Paper>

    </>
}

export default BottomNavigationMenu;