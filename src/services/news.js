import axios from 'axios';
const request = axios.create({
  baseURL: 'https://sapotacorp.com:8443/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const login = data => {
  return request({
    url: '/users/login',
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

const getNews = data => {
  console.log(data);
  return request({
    url: `/users/profile?username=${data}`,
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
    url: `/news/accept/${data}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const deleteNews = ids => {
  return request({
    url: `/news/deleteIds`,
    method: 'DELETE',
    data: ids
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getNewByCategoryID = id => {
  return request({
    url: `/news/category_is_active/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getNews, addNews, editNews, deleteNews, aprrNews, getNewsId, getNewByCategoryID };
