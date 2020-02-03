import actions from './actions';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getProvince } from '../../services/province';
import { Error } from 'helpers/notify';

function* getProvinceSaga() {
  yield takeLatest(actions.GET_PROVINCE_REQUEST, function*(params) {
    try {
      const res = yield getProvince();
      if (res.status === 200) {
        yield put({ type: actions.GET_PROVINCE_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getProvinceSaga)]);
}
