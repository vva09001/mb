import request from 'helpers/request';

const getPages = () => {
  return request({
    url: '/pages',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addPages = data => {
  return request({
    url: '/pages',
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

const editPages = data => {
  return request({
    url: `/pages/${data.id}`,
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

const deletePages = id => {
  return request({
    url: `pages/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const updatePositionService = (idPage, idParent, positions) => {
  return request({
    url: `/pages/update_position/${idParent}/${idPage}?position=${positions}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getPages, addPages, editPages, deletePages, updatePositionService };
