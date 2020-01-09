import actions from './actions';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getCountryService } from 'services/country';
import { Error} from 'helpers/notify';


function* getCountrySaga() {
  yield takeLatest(actions.GET_COUNTRY_REQUEST, function*(params) {
    try {
      const res = yield getCountryService();
      if (res.status === 200) {
        yield put({ type: actions.GET_COUNTRY_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getCountrySaga)]);
}
