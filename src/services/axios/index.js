import ApiConfig from '../../config/api.config';

const axios = require('axios');

export const remoteRequest = axios.create({
    baseURL: ApiConfig.BASE_URL,
    timeout: 10000,
    headers: {'authorization': localStorage.getItem('x_auth_token')}
});
