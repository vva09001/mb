import request from 'helpers/request';

const getMenus = () => {
  return request({
    url: '/news',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addMenus = data => {
  return request({
    url: `/news/category/${data.category_news_id}`,
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

const editMenus = data => {
  return request({
    url: `/news/${data.id}`,
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

const deleteMenus = id => {
  return request({
    url: `/news/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getMenus, addMenus, editMenus, deleteMenus };
