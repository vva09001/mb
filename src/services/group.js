import request from 'helpers/request';

const getGroupService = () => {
  return request({
    url: '/teams',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getGroupByIdService = id => {
  return request({
    url: `/teams/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getGroupByUser = () => {
  return request({
    url: `/teams/user`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createGroupService = data => {
  return request({
    url: '/teams',
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

const editGroupService = (id, data) => {
  return request({
    url: `/teams/${id}`,
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
const deleteGroupService = ids => {
  return request({
    url: `/teams/deleteIds`,
    method: 'DELETE',
    data: ids
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export {
  getGroupService,
  getGroupByIdService,
  getGroupByUser,
  createGroupService,
  editGroupService,
  deleteGroupService
};
