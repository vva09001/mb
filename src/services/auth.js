import axios from 'axios';

const request = axios.create({
  baseURL: 'https://mbbank0312.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const login = data => {
  return request({
    url: '/users/login',
    method: 'POST',
    data: data
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { login };
