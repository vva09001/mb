import request from 'helpers/request';

const getNews = () => {
  return request({
    url: '/news',
    method: 'GET'
  });
};

const addNews = data => {
  return request({
    url: '/news',
    method: 'POST',
    data: data
  });
};

const editNews = data => {
  return request({
    url: `/news/${data.id}`,
    method: 'PUT',
    data: data
  });
};

const deleteNews = id => {
  return request({
    url: `/news/${id}`,
    method: 'DELETE'
  });
};

export { getNews, addNews, editNews, deleteNews };
