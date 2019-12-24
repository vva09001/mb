import axios from 'axios';
import { getToken, getLang } from './localStorage';

const { REACT_APP_BASE_URL } = process.env;
const request = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/${getLang()}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

request.interceptors.request.use(
  async config => {
    const token = await getToken();
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (token !== null) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// after send request
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
