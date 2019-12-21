import actions from './actions';
import history from 'helpers/history';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getSliderService, createSliderService, editSliderService, deleteSliderService } from 'services/slider';
import { Error, Success } from 'helpers/notify';

function* getSliderSaga() {
  yield takeLatest(actions.GET_SLIDER_REQUEST, function*(params) {
    try {
      const res = yield getSliderService();
      if (res.status === 200) {
        yield put({ type: actions.GET_SLIDER_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createSliderSaga() {
  yield takeLatest(actions.CREATE_SLIDER_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createSliderService(data);
      if (res.status === 200) {
        yield Success('Tạo thành công');
        yield put({ type: actions.CREATE_SLIDER_RESPONSE, data: res.data });
        yield history.push('/pages/tags');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editSliderSaga() {
  yield takeLatest(actions.EDIT_SLIDER_REQUEST, function*(params) {
    const { id, data } = params;
    try {
      const res = yield editSliderService(id, data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_SLIDER_RESPONSE, data: res.data });
        yield history.push('/pages/tags');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteSliderSaga() {
  yield takeLatest(actions.DELETE_SLIDER_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteSliderService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_SLIDER_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getSliderSaga), fork(createSliderSaga), fork(editSliderSaga), fork(deleteSliderSaga)]);
}
