import axios from 'axios';

const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/vi/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getMenus = () => {
  return request({
    url: '/menu',
    method: 'GET'
  });
};

const addMenus = data => {
  return request({
    url: '/menu',
    method: 'POST',
    data: data
  });
};

const editMenus = data => {
  return request({
    url: `/menu/${data.id}`,
    method: 'PUT',
    data: data
  });
};

const deleteMenus = id => {
  return request({
    url: `/menu/${id}`,
    method: 'DELETE'
  });
};

export { getMenus, addMenus, editMenus, deleteMenus };
