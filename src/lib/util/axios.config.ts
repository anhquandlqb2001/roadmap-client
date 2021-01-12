import axios from 'axios';
import { SERVER_ENDPOINT } from './endpoints.constant';

const instance = axios.create({
    baseURL: SERVER_ENDPOINT,
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