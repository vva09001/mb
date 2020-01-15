import request from 'helpers/request';

const getSettingService = () => {
  return request({
    url: '/setting',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const editSettingService = data => {
  return request({
    url: `/setting/edit`,
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

const getEncryptionService = () => {
  return request({
    url: '/setting/encryptions',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};
export { getSettingService, editSettingService, getEncryptionService };
