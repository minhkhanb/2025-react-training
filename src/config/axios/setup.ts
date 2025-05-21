import axios from 'axios';
import applyInterceptors from './handler';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

applyInterceptors(api);

export default api;
