import request from 'helpers/request';

const getCountryService = () => {
  return request({
    url: '/setting/country',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getCountryService };
