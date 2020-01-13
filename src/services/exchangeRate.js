import request from 'helpers/request';

const getExchangeRateService = () => {
  return request({
    url: '/exchange_rate',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createExchangeRateService = data => {
  return request({
    url: '/exchange_rate',
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

const editExchangeRateService = data => {
  return request({
    url: `/exchange_rate/${data.id}`,
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

const deleteExchangeRateService = id => {
  return request({
    url: `/exchange_rate/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getExchangeRateService, createExchangeRateService, editExchangeRateService, deleteExchangeRateService };
