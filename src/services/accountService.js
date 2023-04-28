import axios from '../axios';
import * as queryString from 'query-string';
let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API

// let BASE_URL_API = process.env.REACT_APP_PAYPAL_CLIENT_ID

const accountService = {
    setRechargeAccount(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}client/recharge`, body)
    },

    getInfoClient() {
        return axios.get(`${REACT_APP_BASE_URL_API}auth/infoClient`)
    },

    updateInfoClient(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}client/saveClient`, body)
    },

    getRequiredData() {
        return Promise.all([
            this.getInfoClient()
        ]);
    },

    updateProperty(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}property/loan/saveProperty`, body)
    },


    getAllProperty(page, records, codeProperty, codeTypeProperty, nameProperty) {  // Lấy ra danh sách tài sản
        var queryParams = {
            page, records, codeProperty, codeTypeProperty, nameProperty
        };
        return axios.get(`${REACT_APP_BASE_URL_API}property/loan/findAllProperty?` + queryString.stringify(queryParams))
        // http://localhost:8080/property/loan/findAllProperty?page=1&records=10&codeProperty=&codeTypeProperty=&nameProperty=    },
    },

    getPropertyDetail(codeProperty) {  // Lấy ra thông tin tài sản chi tiết
        var queryParams = {
            codeProperty
        };
        return axios.get(`${REACT_APP_BASE_URL_API}property/loan/findPropertyDetail?` + queryString.stringify(queryParams))
        // http://localhost:8080/property/loan/findPropertyDetail?codeProperty=2
    },


    updateSwitchAccount(body) { //Chuyển đổi loại tài khoản
        return axios.post(`${REACT_APP_BASE_URL_API}accountslever/switchAccount`, body)
    },

}
export default accountService