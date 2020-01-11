import request from 'helpers/request';

const getInterestRateService = () => {
  return request({
    url: '/interest_rate',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createInterestRateService = (data) => {
  return request({
    url: '/interest_rate',
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

const updateInterestRateService = (data) => {
  console.log(data);
  return request({
    url: `/interest_rate/${data.id}`,
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

export { getInterestRateService ,createInterestRateService ,updateInterestRateService};
