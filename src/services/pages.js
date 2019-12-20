import axios from 'axios';

const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/vi/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getPagesService = () => {
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

const addPagesService = data => {
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
const apprPagesService = data => {
  return request({
    url: `/pages/change_active/${data.id}`,
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

const editPagesService = data => {
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

const deletePagesService = id => {
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

const updatePositionPagesService = (idPage, idParent, positions) => {
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

export {
  getPagesService,
  addPagesService,
  editPagesService,
  deletePagesService,
  updatePositionPagesService,
  apprPagesService
};
