import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
    timeout: 10000,
});


if (import.meta.env.DEV) {
}

export default api;