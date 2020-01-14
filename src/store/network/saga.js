import actions from './actions';
import history from 'helpers/history';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getNetwork,
  getNetworkId,
  createNetwork,
  editNetwork,
  deleteNetwork,
  aprrNetwork,
  searchNetwork
} from 'services/network';
import { Error, Success } from 'helpers/notify';

function* getNetworkSaga() {
  yield takeLatest(actions.GET_NETWORK_REQUEST, function* (params) {
    try {
      const res = yield getNetwork();
      if (res.status === 200) {
        yield put({ type: actions.GET_NETWORK_RESPONSE, data:{ data: res.data ,search : res.data} });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getNetworkIdSaga() {
  yield takeLatest(actions.GET_BY_NETWORK_ID_REQUEST, function* (params) {
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
  yield takeLatest(actions.CREATE_NETWORK_REQUEST, function* (params) {
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
  yield takeLatest(actions.APRR_NETWORK_REQUEST, function* (params) {
    const { data } = params;
    try {
      const res = yield aprrNetwork(data);
      if (res.status === 200) {
        Success('');
        yield put({ type: actions.GET_NETWORK_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editNetworkSaga() {
  yield takeLatest(actions.APRR_NETWORK_REQUEST, function* (params) {
    const { data } = params;
    try {
      const res = yield editNetwork(data);
      if (res.status === 200) {
        yield put({ type: actions.GET_NETWORK_RESPONSE, data: res.data });
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
  yield takeLatest(actions.DELETE_NETWORK_REQUEST, function* (params) {
    const { data } = params;
    try {
      yield deleteNetwork(data);
      const res = yield getNetwork();
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.GET_NETWORK_RESPONSE, data:{ data: res.data ,search : res.data} });
      }else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* searchNetworkSaga() {
    yield takeLatest(actions.SEARCH_NETWORK_REQUEST, function* (params) {
      const { data } = params;
      try {
        const res = yield searchNetwork(data);
        const dataNetWork = yield getNetwork();
        if (res.status === 200 && dataNetWork.status === 200) {
          yield put({ type: actions.GET_NETWORK_RESPONSE, data:{ data: res.data, search :dataNetWork.data } });
        }
        if (res.status === 404) {
          yield Success('Không tìm thấy giữ liệu');
          yield put({ type: actions.GET_NETWORK_RESPONSE, data:{ data: null, search :dataNetWork.data } });
        }
        if(res.status !== 200 && res.status !== 404) {
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
    fork(getNetworkIdSaga),
    fork(searchNetworkSaga),
  ]);
}
