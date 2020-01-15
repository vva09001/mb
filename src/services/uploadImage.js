import axios from 'axios';
const request = axios.create({
  baseURL: 'http://45.77.172.38:8088/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
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
