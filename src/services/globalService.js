import axios from '../axios';

let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API

// let BASE_URL_API = process.env.REACT_APP_PAYPAL_CLIENT_ID

const globalService = {
    getProvinceAll() {
        return axios.get(`${REACT_APP_BASE_URL_API}province/findAll`)
    },
}

export default globalService