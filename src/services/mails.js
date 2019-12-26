import request from 'helpers/request';

const getMails = () => {
  return request({
    url: '/email',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addMails = data => {
  return request({
    url: '/email',
    methot: 'POST',
    data: data
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const editMails = data => {
  return request({
    url: `/email/${data.id}`,
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

const deleteMails = idMail => {
  return request({
    url: `/email/${idMail}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};
export { getMails, addMails, editMails, deleteMails };
