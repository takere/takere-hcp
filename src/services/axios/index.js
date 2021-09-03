const axios = require('axios');

const API_URL = 'http://localhost:3000/'
const authToken = localStorage.getItem('x_auth_token');

export const remoteRequest = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {'authorization': authToken}
});
