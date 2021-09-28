const axios = require('axios');

const API_URL = 'https://tg2-api.herokuapp.com/'
const authToken = localStorage.getItem('x_auth_token');

export const remoteRequest = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {'authorization': authToken}
});
