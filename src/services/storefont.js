import request from 'helpers/request';

const getStoreFont = name => {
  return request({
    url: `/common/${name}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const editStoreFontGeneral = data => {
  return request({
    url: '/common/edit/general',
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
const editStoreFontLogo = data => {
  return request({
    url: '/common/edit/logo',
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
const editStoreFontSocialLink = data => {
  return request({
    url: '/common/edit/sociallink',
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

export { getStoreFont, editStoreFontGeneral, editStoreFontLogo, editStoreFontSocialLink };
