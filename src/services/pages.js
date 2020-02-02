import request from 'helpers/request';

const getPagesService = () => {
  return request({
    url: '/pages',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getPageByIDService = id => {
  return request({
    url: `/pages/${id}`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addPagesService = data => {
  return request({
    url: '/pages',
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
const apprPagesService = data => {
  return request({
    url: `/pages/change_active/${data}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const editPagesService = data => {
  return request({
    url: `/pages/${data.id}`,
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

const deletePagesService = id => {
  return request({
    url: `pages/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const deletePageBlockService = (id, idBlock) => {
  return request({
    url: `pages/${id}/pageBlock/${idBlock}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const updatePositionPagesService = (idPage, idParent, positions) => {
  return request({
    url: `/pages/update_position/${idParent}/${idPage}?position=${positions}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getHomepageIDService = () => {
  return request({
    url: `/pages/homepage`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export {
  getPagesService,
  getPageByIDService,
  addPagesService,
  editPagesService,
  deletePagesService,
  updatePositionPagesService,
  apprPagesService,
  deletePageBlockService,
  getHomepageIDService
};
