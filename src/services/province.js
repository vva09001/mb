import axios from 'axios';
import { getToken } from '../helpers/localStorage';
const request = axios.create({
  baseURL: 'https://sapotacorp.com:8443/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
request.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${getToken()}`;
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


const getProvince = () => {
    
  return request({
    url: 'province',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getProvince };
