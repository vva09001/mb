import request from 'helpers/request';

const getfeedbackMailsId = id => {
  return request({
    url: `/feedback/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addfeedbackMail = data => {
  return request({
    url: '/feedback',
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

const editfeedbackMail = data => {
  return request({
    url: `/feedback/${data.id}`,
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

export {getfeedbackMailsId, addfeedbackMail, editfeedbackMail};
