import request from 'helpers/request';

const getMenus = () => {
  return request({
    url: '/news',
    method: 'GET'
  });
};

const addMenus = data => {
  return request({
    url: `/news/category/${data.category_news_id}`,
    method: 'POST',
    data: data
  });
};

const editMenus = data => {
  return request({
    url: `/news/${data.id}`,
    method: 'PUT',
    data: data
  });
};

const deleteMenus = id => {
  return request({
    url: `/news/${id}`,
    method: 'DELETE'
  });
};

export { getMenus, addMenus, editMenus, deleteMenus };
