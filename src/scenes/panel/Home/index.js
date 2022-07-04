import * as React from 'react';


import { useSelector } from "react-redux";
import ChooseBroker from './ChooseBroker';
import SignalsList from './SignalsList';
import LicenseAlert from "../../../components/LicenseAlert"
import Layout from "../../../components/Layout"


const Page = () => {
    const user = useSelector(state => state.auth.user)

    if (user.broker) return <Layout><LicenseAlert /><SignalsList /></Layout>
    else return <Layout><ChooseBroker /></Layout>
}
export default Page