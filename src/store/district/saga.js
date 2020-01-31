import actions from './actions';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getDistrict } from '../../services/district';
import { Error } from 'helpers/notify';

function* getDistrictSaga() {
  yield takeLatest(actions.GET_DISTRICT_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getDistrict(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_DISTRICT_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getDistrictSaga)]);
}
