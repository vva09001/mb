import axios from 'axios';

const getToken = () => {
  const localStore = JSON.parse(localStorage.getItem('persist:root'));
  const profile = JSON.parse(localStore.AuthReducer);
  // const token = JSON.parse(localStore)
  return profile.token;
};

const { REACT_APP_BASE_URL } = process.env;
const request = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// before send request
request.interceptors.request.use(
  async config => {
    const token = await getToken();
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
