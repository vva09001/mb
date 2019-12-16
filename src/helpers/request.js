import axios from 'axios';

const getToken = () => {
  const localStore = JSON.parse(localStorage.getItem('persist:root'));
  const profile = JSON.parse(localStore.AuthReducer);
  return profile.profile.token;
};

const { REACT_APP_BASE_URL } = process.env;
const request = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

request.interceptors.request.use(
  async config => {
    const token = await getToken();
    request.defaults.headers.common['Authorization'] = token;
    if (token !== null) {
      config.headers.token = token;
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
