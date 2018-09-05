import axios from 'axios';
import config from '../../config';

const baseURL = config.baseURL;


export default axios.create({
    ...axios.defaults,
    baseURL: `${baseURL}/cards`
});
