import axios from 'axios';
import { SERVER_ENDPOINT } from './constant';

const instance = axios.create({
    baseURL: SERVER_ENDPOINT,
    withCredentials: true
});

let token

if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
}
if (token) {
    instance.defaults.headers.common['Authorization'] = token;
}
// Where you would set stuff like your 'Authorization' header, etc ...


export default instance;