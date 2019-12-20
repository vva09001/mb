import request from 'helpers/request';

const getRolesService = () => {
  return request({
    url: '/roles',
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
    url: '/roles',
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

const editRolesService = data => {
  return request({
    url: `/roles/${data.id}`,
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
    url: `roles/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getRolesService, addRolesService, editRolesService, deleteRolesService };
