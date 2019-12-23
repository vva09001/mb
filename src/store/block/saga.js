import actions from './actions';
import history from 'helpers/history';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getBlockService,
  createBlockService,
  editBlockService,
  deleteBlockService,
  deleteBlockValuesService
} from 'services/block';
import { Error, Success } from 'helpers/notify';

function* getBlockSaga() {
  yield takeLatest(actions.GET_BLOCK_REQUEST, function*(params) {
    try {
      const res = yield getBlockService();
      if (res.status === 200) {
        yield put({ type: actions.GET_BLOCK_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* createBlockSaga() {
  yield takeLatest(actions.CREATE_BLOCK_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createBlockService(data);
      if (res.status === 200) {
        yield Success('Tạo thành công');
        yield put({ type: actions.CREATE_BLOCK_RESPONSE, data: res.data });
        yield history.push('/pages/block');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editBlockSaga() {
  yield takeLatest(actions.EDIT_BLOCK_REQUEST, function*(params) {
    const { id, data } = params;
    try {
      const res = yield editBlockService(id, data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_BLOCK_RESPONSE, data: res.data });
        yield history.push('/pages/block');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteBlockSaga() {
  yield takeLatest(actions.DELETE_BLOCK_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteBlockService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_BLOCK_RESPONSE, id: id });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteBlockValueSaga(params) {
  yield takeLatest(actions.DELETE_BLOCK_VALUE_REQUEST, function*(params) {
    const { blockID, blockValueID } = params;
    try {
      const res = yield deleteBlockValuesService(blockID, blockValueID);
      if (res.status === 200) {
        yield Success('Xóa thành công');
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
    fork(getBlockSaga),
    fork(createBlockSaga),
    fork(editBlockSaga),
    fork(deleteBlockSaga),
    fork(deleteBlockValueSaga)
  ]);
}
