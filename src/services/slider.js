import axios from 'axios';

const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getSliderService = () => {
  return request({
    url: '/slider',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createSliderService = data => {
  return request({
    url: '/slider',
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

const editSliderService = (id, data) => {
  return request({
    url: `/slider/${id}`,
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
const deleteSliderService = id => {
  return request({
    url: `/slider/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getSliderService, createSliderService, editSliderService, deleteSliderService };