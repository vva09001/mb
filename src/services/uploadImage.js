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

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.upload = this.upload.bind(this);
    this.abort = this.abort.bind(this);
  }

  upload() {
    return this.loader.file.then(file => {
      const data = new FormData();
      data.append('folderName', 'News/');
      data.append('files', file);

      return request({
        url: '/image/addListFileWithFolder',
        method: 'POST',
        data: data
      })
        .then(res => {
          var resData = res.data[0];
          resData.default = resData.url;

          return resData;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    });
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}
export default UploadAdapter;
