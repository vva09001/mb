import actions from './actions';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getInterestRateService,
  createInterestRateService,
  updateInterestRateService,
  deleteInterestRateService
} from 'services/InterestRate';
import { Error } from 'helpers/notify';
import { Success } from '../../helpers/notify';

function* getInterestRateSaga() {
  yield takeLatest(actions.GET_INTEREST_RATE_REQUEST, function* (params) {
    try {
      const res = yield getInterestRateService();
      if (res.status === 200) {
        yield put({ type: actions.GET_INTEREST_RATE_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createInterestRateSaga() {
  yield takeLatest(actions.CREATE_INTEREST_RATE_REQUEST, function* (params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield createInterestRateService(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.GET_INTEREST_RATE_REQUEST, data: res.data });
        yield put({ type: actions.CREATE_INTEREST_RATE_RESPONSE, data: true });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* updateInterestRateSaga() {
  yield takeLatest(actions.UPDATE_INTEREST_RATE_REQUEST, function* (params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield updateInterestRateService(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.GET_INTEREST_RATE_REQUEST, data: res.data });
        yield put({ type: actions.UPDATE_INTEREST_RATE_RESPONSE, data: true });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteInterestRateSaga() {
  yield takeLatest(actions.DELETE_INTEREST_RATE_REQUEST, function* (params) {
    const { data } = params;
    try {
      const res = yield deleteInterestRateService(data);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.GET_INTEREST_RATE_REQUEST, data: res.data });
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
    fork(getInterestRateSaga),
    fork(createInterestRateSaga),
    fork(updateInterestRateSaga),
    fork(deleteInterestRateSaga)
  ]);
}
