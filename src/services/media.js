import axios from 'axios';
import { getToken } from '../helpers/localStorage';
const request = axios.create({
  baseURL: 'https://sapotacorp.com:8443/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
request.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

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
    url: '/image/addListFileWithFolder',
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

const renameFolderService = data => {
  return request({
    url: 'image/edit-folder',
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

const createFolderService = data => {
  return request({
    url: 'image/add-folder',
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

const deleteFolderService = data => {
  return request({
    url: 'image/delete-folder',
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

const deleteListImageService = data => {
  return request({
    url: 'image/deleteIds',
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

export {
  getImagesService,
  addImagesService,
  editImagesService,
  deleteImagesService,
  moveFolderService,
  moveFileService,
  renameFolderService,
  createFolderService,
  deleteFolderService,
  deleteListImageService
};
