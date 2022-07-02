import logo from "../assets/images/logo.png"


const Logo = ({ width }) => {
    return <img width={width || 75} src={logo} alt="Evaluate Softwares" />
}

export default Logo