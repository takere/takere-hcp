const axios = require('axios');

//const API_URL = 'https://tg2-api.herokuapp.com/'
const API_URL = 'http://localhost:3002/';

export const remoteRequest = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {'authorization': localStorage.getItem('x_auth_token')}
});
