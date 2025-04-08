import axios from "axios";

export const BASE_URL = 'http://213.176.92.82:5000/api'

const token = localStorage.getItem('token')

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'Authorization': 'Bearer ' + token}
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
       localStorage.removeItem('token');
       window.location.href = '/login';
    }
    return error;

});
