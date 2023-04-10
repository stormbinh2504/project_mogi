import axios from '../axios';

let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API

// let BASE_URL_API = process.env.REACT_APP_PAYPAL_CLIENT_ID

const accountService = {
    setRechargeAccount(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}client/recharge`, body)
    },
    
    getInfoClient() {
        return axios.get(`${REACT_APP_BASE_URL_API}auth/infoClient`)
    },

    getRequiredData() {
        return Promise.all([
            this.getInfoClient()
        ]);
    },
}

export default accountService