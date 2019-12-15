import request from 'helpers/request';

const getPages = () => {
  return request({
    url: '/pages',
    method: 'GET'
  });
};

const addPages = data => {
  return request({
    url: '/pages',
    method: 'POST',
    data: data
  });
};

const editPages = data => {
  return request({
    url: `/pages/${data.id}`,
    method: 'PUT',
    data: data
  });
};

const deletePages = id => {
  return request({
    url: `pages/${id}`,
    method: 'DELETE'
  });
};

const updatePositionService = (idPage, idParent, positions) => {
  return request({
    url: `/pages/update_position/${idParent}/${idPage}?position=${positions}`,
    method: 'PUT'
  });
};

export { getPages, addPages, editPages, deletePages, updatePositionService };
