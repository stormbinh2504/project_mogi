import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const PrivateCompareFaceRouter = (props) => {
    const { auth } = useSelector((state) => state);
    return auth.userInfor.token ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateCompareFaceRouter
