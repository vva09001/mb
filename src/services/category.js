import request from 'helpers/request';

const getCategoryService = () => {
  return request({
    url: '/categorys',
    method: 'GET'
  });
};

const addCategoryService = data => {
  return request({
    url: '/categorys',
    method: 'POST',
    data: data
  });
};

const editCategoryService = data => {
  return request({
    url: `/categorys/${data.id}`,
    method: 'PUT',
    data: data
  });
};

const deleteCategoryService = id => {
  return request({
    url: `categorys/change_active/${id}`,
    method: 'PUT'
  });
};

export { getCategoryService, addCategoryService, editCategoryService, deleteCategoryService };
