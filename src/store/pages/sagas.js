import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getPages, addPages, editPages, deletePages } from '../../services/pages';
import { Error, Success } from '../../helpers/notify';
import actions from './actions';

function* getPagesSaga() {
  yield takeLatest(actions.GET_PAGES_REQUEST, function*(params) {
    
    try {
      const res = yield getPages();
      if (res.status === 200) {
        
        yield put({ type: actions.GET_PAGES_RESPONSE, data: res.data });
      } else {
        console.log(res);
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

function* addPagesSaga() {
  yield takeLatest(actions.ADD_PAGES_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      
      const res = yield addPages(data);
      console.log(res);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.ADD_PAGES_RESPONSE, data: res.data });
      } else {
        yield onFail();
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

function* editPagesSaga() {
  yield takeLatest(actions.EDIT_PAGES_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield editPages(data);
      console.log(123)
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_PAGES_RESPONSE, data: res.data });
      } else {
        yield onFail();
        console.log(res);
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

function* deletePagesSaga() {
  yield takeLatest(actions.DELETE_PAGES_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deletePages(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_PAGES_RESPONSE, data: id });
      } else {
        yield Error('Xóa lỗi');
        console.log(res);
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getPagesSaga), fork(addPagesSaga), fork(editPagesSaga), fork(deletePagesSaga)]);
}
