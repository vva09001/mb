import request from 'helpers/request';

const getBlockService = () => {
  return request({
    url: '/blocks',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createBlockService = data => {
  return request({
    url: '/blocks',
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

const editBlockService = (id, data) => {
  return request({
    url: `/blocks/${id}`,
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
const deleteBlockService = id => {
  return request({
    url: `/blocks/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getBlockService, createBlockService, editBlockService, deleteBlockService };
