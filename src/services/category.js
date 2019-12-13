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

const updatePositionService = (idCategory, idParent, positions) => {
  return request({
    url: `/categorys/update_position/${idParent}/${idCategory}?position=${positions}`,
    method: 'PUT'
  });
};

export { getCategoryService, addCategoryService, editCategoryService, deleteCategoryService, updatePositionService };
