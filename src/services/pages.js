import request from '../helpers/request';

const getPages = () => {
  console.log('asdsa')
  return request({
    url: '/pages',
    method: 'GET'
  });
  
};

const addPages = data => {
  console.log(data)
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
    url: `/pages/${id}`,
    method: 'DELETE'
  });
};

export { getPages, addPages, editPages, deletePages };
