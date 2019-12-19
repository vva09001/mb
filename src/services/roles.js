import axios from 'axios';

const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/vi/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getRolesService = () => {
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

const addRolesService = data => {
  return request({
    url: '/users',
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
const apprRolesService = data => {
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

const editRolesService = data => {
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

const deleteRolesService = id => {
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

export { getRolesService, addRolesService, editRolesService, deleteRolesService, apprRolesService };
