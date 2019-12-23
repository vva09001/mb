import actions from './actions';
import history from 'helpers/history';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getSettingService, editSettingService } from 'services/setting';
import { Error, Success } from 'helpers/notify';

function* getSettingSaga() {
  yield takeLatest(actions.GET_SETTING_REQUEST, function*(params) {
    try {
      const res = yield getSettingService();
      if (res.status === 200) {
        yield put({ type: actions.GET_SETTING_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createSettingSaga() {
  yield takeLatest(actions.CREATE_SETTING_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editSettingService(data);
      if (res.status === 200) {
        yield Success('Tạo thành công');
        yield put({ type: actions.CREATE_SETTING_RESPONSE, data: res.data });
        yield history.push('/pages/tags');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editSettingSaga() {
  yield takeLatest(actions.EDIT_SETTING_REQUEST, function*(params) {
    const { id, data } = params;
    try {
      const res = yield editSettingService(id, data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_SETTING_RESPONSE, data: res.data });
        yield history.push('/pages/tags');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getSettingSaga), fork(createSettingSaga), fork(editSettingSaga)]);
}
