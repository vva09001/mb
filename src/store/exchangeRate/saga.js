import Actions from './actions';
import {
  getExchangeRateService,
  createExchangeRateService,
  editExchangeRateService,
  deleteExchangeRateService
} from 'services/exchangeRate';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { Error, Success } from '../../helpers/notify';
import history from '../../helpers/history';

function* getExchangeRateSaga() {
  yield takeLatest(Actions.GET_EXCHANGE_RATE_REQUEST, function*(params) {
    try {
      const res = yield getExchangeRateService();
      if (res.status === 200) {
        yield put({ type: Actions.GET_EXCHANGE_RATE_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createExchangeRateSaga() {
  yield takeLatest(Actions.CREATE_EXCHANGE_RATE_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createExchangeRateService(data);
      if (res.status === 200) {
        Success('Tạo mới thành công');
        yield put({ type: Actions.CREATE_EXCHANGE_RATE_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editExchangeRateSaga() {
  yield takeLatest(Actions.EDIT_EXCHANGE_RATE_REQUEST, function*(params) {
    const { id ,data } = params;
    try {
      const res = yield editExchangeRateService(id,data);
      if (res.status === 200) {
        Success('Sửa thành công');
        yield put({ type: Actions.EDIT_EXCHANGE_RATE_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteExchangeRateSaga() {
  yield takeLatest(Actions.DELETE_EXCHANGE_RATE, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteExchangeRateService(id);
      if (res.status === 200) {
        Success('Xóa thành công');
        history.push('/exchangeRate');
        yield put({ type: Actions.EDIT_EXCHANGE_RATE_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getExchangeRateSaga),
    fork(createExchangeRateSaga),
    fork(editExchangeRateSaga),
    fork(deleteExchangeRateSaga)
  ]);
}
