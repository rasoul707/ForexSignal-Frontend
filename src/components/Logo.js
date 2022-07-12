import logo from "../assets/images/logo.png"


const Logo = ({ width, style }) => {
    return <img width={width || 75} src={logo} alt="Trader Signal" style={style} />
}

export default Logo