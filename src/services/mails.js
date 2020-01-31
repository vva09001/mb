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

const getMailsId = id => {
  return request({
    url: `/email/${id}`,
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

const deleteMails = async ids => {
  try {
    const res = await request({
      url: `/email/deleteIds`,
      method: 'DELETE',
      data: ids
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export { getMails, addMails, editMails, deleteMails, getMailsId };
