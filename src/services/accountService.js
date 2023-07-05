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

    deleteProperty(codeProperty) {
        var queryParams = {
            codeProperty
        };
        return axios.get(`${REACT_APP_BASE_URL_API}property/loan/deleteProperty?` + queryString.stringify(queryParams))
    },


    getAllProperty(page, records, codeClient, codeProperty, codeTypeProperty, nameProperty) {  // Lấy ra danh sách tài sản
        var queryParams = {
            page, records, codeClient, codeProperty, codeTypeProperty, nameProperty
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

    getNewsManagerAll(body) {  // Lấy ra danh sách tin manager
        return axios.post(`${REACT_APP_BASE_URL_API}news/manager/findAllNews`, body)
    },

    updateSaveNews(body) { //Tạo tin mới
        return axios.post(`${REACT_APP_BASE_URL_API}news/saveNews`, body)
    },

    deleteNews(id) { //Xóa tin
        var queryParams = {
            id
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/deleteNews?` + queryString.stringify(queryParams))
    },


    updateUptoNews(body) { //Tạo tin mới
        return axios.post(`${REACT_APP_BASE_URL_API}news/pushTopNews`, body)
    },

    getNewsDetail(id) {  // Lấy ra thông tin  chi tiết tin
        var queryParams = {
            id
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/findNewsDetail?` + queryString.stringify(queryParams))
    },

    updateSwitchAccount(body) { //Chuyển đổi loại tài khoản
        return axios.post(`${REACT_APP_BASE_URL_API}accountslever/switchAccount`, body)
    },


    getStatisticsByDistrict(body) { //Chuyển đổi loại tài khoản
        const { provinceCode,
            month,
            year,
            codeCategoryTypeProperty } = body
        var queryParams = {
            provinceCode,
            month,
            year,
            codeCategoryTypeProperty,
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/statisticsByDistrict?` + queryString.stringify(queryParams))
    },

    getStatisticsByPrice(body) { //Chuyển đổi loại tài khoản
        const { provinceCode,
            month,
            year,
            codeCategoryTypeProperty } = body
        var queryParams = {
            provinceCode,
            month,
            year,
            codeCategoryTypeProperty,
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/statisticsByPrice?` + queryString.stringify(queryParams))
    },

}
export default accountService