import { useEffect } from "react";
import { push } from "connected-react-router";
import { reduxStore, dispatch } from "../../src/redux/store"
class CommonUtils {

    static checkLogined() {
        const state = reduxStore.getState();
        console.log("checkLogined3", state)
        let isLoggedIn = state.user.isLoggedIn;
        if (!isLoggedIn) {
            console.log("checkLogined4", state)
            dispatch(push("/login"))
            return false
        }
        return isLoggedIn;
    };

}

export default CommonUtils;