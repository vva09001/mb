import request from 'helpers/request';

const login = data => {
  return request({
    url: '/users/login',
    method: 'POST',
    data: data
  });
};

export { login };
