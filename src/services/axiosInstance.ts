import axios from 'axios';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : 'https://server.ai.faramunt.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  adapter: 'fetch',
});
