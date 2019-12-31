import request from 'helpers/request';
// import axios from 'axios';
// const request = axios.create({
//   baseURL: 'https://bank1712.herokuapp.com/vi/api/',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   }
// });
const getNews = () => {
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

const getNewsId = id => {
  return request({
    url: `/news/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};
const addNews = data => {
  return request({
    url: `/news`,
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

const editNews = data => {
  return request({
    url: `/news/${data.newsId}`,
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

const aprrNews = data => {
  return request({
    url: `/news/accept/${data.newsId}`,
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

const deleteNews = id => {
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

export { getNews, addNews, editNews, deleteNews, aprrNews, getNewsId };
