
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { injectStyle } from "react-toastify/dist/inject-style";
import DashBoard from './../containers/DashBoard/DashBoard';
import PrivateRouterLogin from './../containers/customRouter/PrivateRouterLogin';

function Routes() {
    const { auth } = useSelector((state) => state);
    console.log("binh--auth", auth)

    return (
        <Switch>
            <Route exact path="/dashboard" component={DashBoard} />
        </Switch>
    );
}

export default Routes;
