import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getImagesService, addImagesService, editImagesService, deleteImagesService } from '../../services/media';
import { Error, Success } from '../../helpers/notify';
import actions from './actions';

function* getImagesSaga() {
  yield takeLatest(actions.GET_IMAGES_REQUEST, function*(params) {
    try {
      const res = yield getImagesService();
      if (res.status === 200) {
        console.log(res.data);
        yield put({ type: actions.GET_IMAGES_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addImagesSaga() {
  yield takeLatest(actions.ADD_IMAGES_REQUEST, function*(params) {
    const { data } = params;
    try {
<<<<<<< HEAD
=======
      console.log(data);
>>>>>>> 5af6be177b5c138267def4941777173598afb5ef
      const res = yield addImagesService(data);
      if (res.status === 200) {
        Success('Thêm thành công');
        yield put({ type: actions.GET_IMAGES_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editImagesSaga() {
  yield takeLatest(actions.EDIT_IMAGES_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editImagesService(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.GET_IMAGES_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteImagesSaga() {
  yield takeLatest(actions.DELETE_IMAGES_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteImagesService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.GET_IMAGES_REQUEST, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getImagesSaga),
    fork(addImagesSaga),
    fork(editImagesSaga),
<<<<<<< HEAD
    fork(deleteImagesSaga),
=======
    fork(deleteImagesSaga)    
>>>>>>> 5af6be177b5c138267def4941777173598afb5ef
  ]);
}
