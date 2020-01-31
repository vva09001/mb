import request from 'helpers/request';

const getMenus = () => {
  return request({
    url: '/menu',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addMenus = data => {
  return request({
    url: '/menu',
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

const editMenus = data => {
  return request({
    url: `/menu/${data.id}`,
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

const deleteMenus = ids => {
  return request({
    url: `/menu/deleteIds`,
    method: 'DELETE',
    data: ids
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const getMenuItems = id => {
  return request({
    url: `/menu/${id}/menuItem`,
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addMenuItems = (id, data) => {
  return request({
    url: `/menu/${id}/menuItem`,
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

const editMenuItems = data => {
  return request({
    url: `/menu/${data.menuId}/menuItem/${data.id}`,
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

const deleteMenuItems = data => {
  return request({
    url: `/menu/${data.menuId}/menuItem/${data.id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const updatePositionMenuItemsService = (idMenuItem, idParent, positions) => {
  return request({
    url: `/menu/1/menuItem/update_position/${idParent}/${idMenuItem}?position=${positions}`,
    method: 'PUT'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};
export {
  getMenus,
  addMenus,
  editMenus,
  deleteMenus,
  getMenuItems,
  addMenuItems,
  editMenuItems,
  deleteMenuItems,
  updatePositionMenuItemsService
};
