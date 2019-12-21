import axios from 'axios';

const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getSettingService = () => {
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

const editSettingService = (id, data) => {
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

export { getSettingService, editSettingService };
