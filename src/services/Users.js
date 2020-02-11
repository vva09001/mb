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
    url: `/users/deleteIds`,
    method: 'DELETE',
    data: id
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getUserByIdService = id => {
  return request({
    url: `/users/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};
const getUserByUsernameService = username => {
  return request({
    url: `/users/profile?username=${username}`,
    method: 'GET',
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};
const editPasswordService = id => {
  return request({
    url: `/users/password/${id}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export {
  getUsersService,
  addUsersService,
  editUsersService,
  deleteUsersService,
  apprUsersService,
  getUserByIdService,
  editPasswordService,
  getUserByUsernameService
};
