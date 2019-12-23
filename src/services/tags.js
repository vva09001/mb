import request from 'helpers/request';

const getTagService = () => {
  return request({
    url: '/tag',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createTagService = data => {
  return request({
    url: '/tag',
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

const editTagService = (id, data) => {
  return request({
    url: `/tag/${id}`,
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
const deleteTagService = id => {
  return request({
    url: `/tag/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getTagService, createTagService, editTagService, deleteTagService };
