import axios from 'axios';
import env from '../utils/Env';

export default axios.create({
    baseURL: env.apiUrl
});