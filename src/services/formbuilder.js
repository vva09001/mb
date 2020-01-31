import request from '../helpers/request';

const getFormbuilderService = () => {
  return request({
    url: '/forms',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createFormbuilderService = data => {
  return request({
    url: '/forms',
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

const editFormbuilderService = (id, data) => {
  return request({
    url: `/forms/${id}`,
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
const deleteFormbuilderService = ids => {
  return request({
    url: `/forms/deleteIds`,
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

const getFormbuilderByIdService = id => {
  return request({
    url: `/forms/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export {
  getFormbuilderService,
  createFormbuilderService,
  editFormbuilderService,
  deleteFormbuilderService,
  getFormbuilderByIdService
};
