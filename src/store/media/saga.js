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

// function* getAllImagesSaga() {
//   yield takeLatest(actions.GET_ALL_PAGES_REQUEST, function*(params) {
//     try {
//       const res = yield getImagesService();
//       if (res.status === 200) {
//         yield put({ type: actions.GET_ALL_PAGES_RESPONSE, data: res.data });
//       } else {
//         yield Error(res.message);
//       }
//     } catch (error) {
//       yield Error('Không thể kết nối đến server');
//     }
//   });
// }
//
// function* addImagesSaga() {
//   yield takeLatest(actions.ADD_PAGES_REQUEST, function*(params) {
//     const { data } = params;
//     try {
//       const res = yield addImagesService(data);
//       if (res.status === 200) {
//         Success('Thêm thành công');
//         yield put({ type: actions.GET_PAGES_REQUEST, data: res.data });
//       } else {
//         yield Error(res.message);
//       }
//     } catch (error) {
//       yield Error('Không thể kết nối đến server');
//     }
//   });
// }
//
// function* editImagesSaga() {
//   yield takeLatest(actions.EDIT_PAGES_REQUEST, function*(params) {
//     const { data } = params;
//     try {
//       const res = yield editImagesService(data);
//       if (res.status === 200) {
//         yield Success('Sửa thành công');
//         yield put({ type: actions.GET_PAGES_REQUEST, data: res.data });
//       } else {
//         yield Error(res.message);
//       }
//     } catch (error) {
//       yield Error('Không thể kết nối đến server');
//     }
//   });
// }
//
// function* deleteImagesSaga() {
//   yield takeLatest(actions.DELETE_PAGES_REQUEST, function*(params) {
//     const { id } = params;
//     try {
//       const res = yield deleteImagesService(id);
//       if (res.status === 200) {
//         yield Success('Xóa thành công');
//         yield put({ type: actions.GET_PAGES_REQUEST, data: id });
//       } else {
//         yield Error('Xóa lỗi');
//       }
//     } catch (error) {
//       yield Error('Không thể kết nối đến server');
//     }
//   });
// }

export default function* rootSaga() {
  yield all([
    fork(getImagesSaga),
    // fork(addImagesSaga),
    // fork(editImagesSaga),
    // fork(deleteImagesSaga),
    // fork(getAllImagesSaga)
  ]);
}
