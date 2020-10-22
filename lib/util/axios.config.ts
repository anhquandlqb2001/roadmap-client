import axios from 'axios';
import { SERVER_ENDPOINT } from './constant';

const instance = axios.create({
    baseURL: SERVER_ENDPOINT,
    withCredentials: true
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';


export default instance;