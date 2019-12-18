import axios from 'axios';

const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/vi/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getFormbuilderService = () => {
  return request({
    url: '/forms',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createFormbuilderService = data => {
  return request({
    url: '/forms',
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

const editFormbuilderService = (id, data) => {
  return request({
    url: `/forms/${id}`,
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
const deleteFormbuilderService = id => {
  return request({
    url: `/forms/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getFormbuilderService, createFormbuilderService, editFormbuilderService, deleteFormbuilderService };
