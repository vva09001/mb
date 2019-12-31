import request from 'helpers/request';

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

export { addfeedbackMail };
