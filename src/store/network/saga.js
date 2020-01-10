import actions from './actions';
import history from 'helpers/history';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getNetwork, getNetworkId, createNetwork, editNetwork, deleteNetwork, aprrNetwork } from 'services/network';
import { Error, Success } from 'helpers/notify';

function* getNetworkSaga() {
  yield takeLatest(actions.GET_NETWORK_REQUEST, function*(params) {
    try {
      const res = yield getNetwork();
      if (res.status === 200) {
        yield put({ type: actions.GET_NETWORK_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getNetworkIdSaga() {
  yield takeLatest(actions.GET_BY_NETWORK_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getNetworkId(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_BY_NETWORK_ID_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createNetworkSaga() {
  yield takeLatest(actions.CREATE_NETWORK_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createNetwork(data);
      if (res.status === 200) {
        Success('Tạo thành công');
        // yield put({ type: actions.CREATE_NETWORK_RESPONSE, data: res.data });
        yield history.push('/network');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* aprrNetworkSaga() {
  yield takeLatest(actions.APRR_NETWORK_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield aprrNetwork(data);
      console.log(res.data);
      if (res.status === 200) {
        Success('Phê duyệt thành công');
        yield put({ type: actions.APRR_NETWORK_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editNetworkSaga() {
  yield takeLatest(actions.APRR_NETWORK_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editNetwork(data);
      console.log(res.data);
      if (res.status === 200) {
        yield put({ type: actions.EDIT_NETWORK_RESPONSE, data: res.data });
        yield history.push('/network');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteNetworkSaga() {
  yield takeLatest(actions.DELETE_NETWORK_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteNetwork(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_NETWORK_RESPONSE, data: id });
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
    fork(getNetworkSaga),
    fork(createNetworkSaga),
    fork(editNetworkSaga),
    fork(deleteNetworkSaga),
    fork(aprrNetworkSaga),
    fork(getNetworkIdSaga)
  ]);
}
