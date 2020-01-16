import axios from 'axios';

const request = axios.create({
  baseURL: 'https://45.77.172.38:8443/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getUsersService = () => {
  return request({
    url: '/users',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addUsersService = data => {
  return request({
    url: '/users/register',
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
const apprUsersService = data => {
  return request({
    url: `/users/change_active/${data.id}`,
    method: 'PUT',
    data: data
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const editUsersService = data => {
  return request({
    url: `/users/${data.id}`,
    method: 'PUT',
    data: data
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const deleteUsersService = id => {
  return request({
    url: `users/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getUsersService, addUsersService, editUsersService, deleteUsersService, apprUsersService };
