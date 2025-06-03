import axios from 'axios';
import applyInterceptors from './handler';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // validateStatus: () => true,
});

applyInterceptors(api);

export default api;
