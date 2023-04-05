import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const PrivateRouterLogin = (props) => {
    const { auth } = useSelector((state) => state);
    return auth.isLogin  ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRouterLogin
