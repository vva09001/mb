import request from 'helpers/request';

const getFormbuilderService = () => {
  return request({
    url: '/forms',
    method: 'GET'
  });
};

const createFormbuilderService = data => {
  return request({
    url: '/forms',
    method: 'POST',
    data: data
  });
};

const editFormbuilderService = (id, data) => {
  return request({
    url: `/forms/${id}`,
    method: 'PUT',
    data: data
  });
};
const deleteFormbuilderService = id => {
  return request({
    url: `/forms/${id}`,
    method: 'DELETE'
  });
};

export { getFormbuilderService, createFormbuilderService, editFormbuilderService, deleteFormbuilderService };
