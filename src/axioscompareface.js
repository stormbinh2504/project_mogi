import axios from 'axios';

const instance = axios.create({
    baseURL: "",
    withCredentials: true,
});

instance.interceptors.request.use((request) => {

    if (request.method === 'post' && typeof request.data === 'string') {
        // request.headers['Content-Type'] = 'multipart/form-data';
        // request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        request.headers['Content-Type'] = 'application/json';
    }
    return request;
});

export default instance;