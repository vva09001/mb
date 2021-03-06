import request from 'helpers/request';

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

const getSliderId = id => {
  return request({
    url: `/slider/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.respose.data;
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

const editSliderService = data => {
  return request({
    url: `/slider/${data.id}`,
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
const deleteSliderService = ids => {
  return request({
    url: `/slider/deleteIds`,
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

export { getSliderService, createSliderService, editSliderService, deleteSliderService, getSliderId };
