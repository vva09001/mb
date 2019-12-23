import actions from './actions';
import history from 'helpers/history';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getTagService, createTagService, editTagService, deleteTagService } from 'services/tags';
import { Error, Success } from 'helpers/notify';

function* getTagSaga() {
  yield takeLatest(actions.GET_TAG_REQUEST, function*(params) {
    try {
      const res = yield getTagService();
      if (res.status === 200) {
        yield put({ type: actions.GET_TAG_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createTagSaga() {
  yield takeLatest(actions.CREATE_TAG_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createTagService(data);
      if (res.status === 200) {
        yield Success('Tạo thành công');
        yield put({ type: actions.CREATE_TAG_RESPONSE, data: res.data });
        yield history.push('/pages/tags');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editTagSaga() {
  yield takeLatest(actions.EDIT_TAG_REQUEST, function*(params) {
    const { id, data } = params;
    try {
      const res = yield editTagService(id, data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_TAG_RESPONSE, data: res.data });
        yield history.push('/pages/tags');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteTagSaga() {
  yield takeLatest(actions.DELETE_TAG_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteTagService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_TAG_RESPONSE, data: id });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getTagSaga), fork(createTagSaga), fork(editTagSaga), fork(deleteTagSaga)]);
}
