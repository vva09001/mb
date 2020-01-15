import request from 'helpers/request';

const getNetwork = () => {
  return request({
    url: '/network',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getNetworkId = id => {
  return request({
    url: `/network/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const createNetwork = data => {
  return request({
    url: '/network',
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
const aprrNetwork = data => {
  return request({
    url: `/network/change_status/${data.id}`,
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

const editNetwork = data => {
  return request({
    url: `/network/${data.id}`,
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
const deleteNetwork = data => {
  return request({
    url: `/network`,
    method: 'DELETE',
    data: data
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const searchNetwork = data => {
  return request({
    url: `/network/search?${buildQuery(data)}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export const buildQuery = params => {
  if (typeof params === 'undefined' || typeof params !== 'object') {
    params = {};
    return params;
  }

  let query = '';
  let index = 0;

  for (const i in params) {
    index++;
    const param = i;
    const value = params[i];
    if (index === 1) {
      query += param + '=' + value;
    } else {
      query += '&' + param + '=' + value;
    }
  }
  return query;
};

export { getNetwork, getNetworkId, createNetwork, editNetwork, deleteNetwork, aprrNetwork, searchNetwork };
