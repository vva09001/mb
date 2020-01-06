import axios from 'axios';
const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getImagesService = () => {
  return request({
    url: '/image',
    method: 'GET'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const addImagesService = data => {
  return request({
    url: '/image/addImageWithFolder',
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

const editImagesService = data => {
  return request({
    url: `/image/${data.id}`,
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

const deleteImagesService = id => {
  return request({
    url: `image/${id}`,
    method: 'DELETE'
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response.data;
    });
};

const moveFolderService = data => {
  return request({
    url: 'image/move-folder',
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

const moveFileService = (id, data) => {
  return request({
    url: `image/${id}`,
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

export {
  getImagesService,
  addImagesService,
  editImagesService,
  deleteImagesService,
  moveFolderService,
  moveFileService
};
