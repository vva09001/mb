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

const deleteMenus = id => {
  return request({
    url: `/menu/${id}`,
    method: 'DELETE'
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

const addMenuItems = data => {
  return request({
    url: `/menu/${data.menuid}/menuItem`,
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
    url: `/menu/${data.menuid}/menuItem/${data.id}`,
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

const deleteMenuItems = (id, menuid) => {
  return request({
    url: `/menu/${menuid}/menuItem/${id}`,
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
    url: `/menuItems/update_position/${idParent}/${idMenuItem}?position=${positions}`,
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
