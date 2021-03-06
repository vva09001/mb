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

const editExchangeRateService = (id,data) => {
  return request({
    url: `/exchange_rate/${id}`,
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

const deleteExchangeRateService = ids => {
  return request({
    url: '/exchange_rate',
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

export { getExchangeRateService, createExchangeRateService, editExchangeRateService, deleteExchangeRateService };
