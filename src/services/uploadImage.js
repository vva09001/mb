import axios from 'axios';
const request = axios.create({
  baseURL: 'https://bank1712.herokuapp.com/api/',
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
      return this.loader.file
      .then(file => {
        const data = new FormData();
        data.append('folderName', 'News/');
        data.append('files', file);
        
        return request({
          url: '/image/addListFileWithFolder',
          method: 'POST',
          data: data
        })
          .then(res => {
            console.log(res.data[0]);
            var resData = res.data[0];
            resData.default = resData.url;
            console.log(resData.default)
            return resData;
          })
          .catch(error => {
            console.log(error);
            return Promise.reject(error);
          });
      })
    
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}
export default UploadAdapter;
