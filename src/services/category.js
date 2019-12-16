import request from 'helpers/request';

const getCategoryService = () => {
  return request({
    url: '/categorys',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addCategoryService = data => {
  return request({
    url: '/categorys',
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

const editCategoryService = data => {
  return request({
    url: `/categorys/${data.id}`,
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

const deleteCategoryService = id => {
  return request({
    url: `categorys/change_active/${id}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const updatePositionService = (idCategory, idParent, positions) => {
  return request({
    url: `/categorys/update_position/${idParent}/${idCategory}?position=${positions}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { getCategoryService, addCategoryService, editCategoryService, deleteCategoryService, updatePositionService };
