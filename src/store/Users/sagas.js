import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getUsersService,
  addUsersService,
  editUsersService,
  deleteUsersService,
  apprUsersService,
  getUserByIdService
} from '../../services/Users';
import { Error, Success } from '../../helpers/notify';
import actions from './actions';
import history from '../../helpers/history';

function* getUsersSaga() {
  yield takeLatest(actions.GET_USERS_REQUEST, function*(params) {
    try {
      const res = yield getUsersService();
      if (res.status === 200) {
        yield put({ type: actions.GET_USERS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addUsersSaga() {
  yield takeLatest(actions.ADD_USERS_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addUsersService(data);
      if (res.status === 200) {
        yield Success('Tạo thành công');
        yield put({ type: actions.ADD_USERS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* aprrUsersSaga() {
  yield takeLatest(actions.APRR_USERS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield apprUsersService(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.APRR_USERS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editUsersSaga() {
  yield takeLatest(actions.EDIT_USERS_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editUsersService(data);
      if (res.status === 200) {
        yield Success('Cập nhật thành công');
        yield put({ type: actions.EDIT_USERS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteUsersSaga() {
  yield takeLatest(actions.DELETE_USERS_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteUsersService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        history.pushState('users/list');
        yield put({ type: actions.GET_USERS_REQUEST, data: res.data });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* getRoleByIdSaga() {
  yield takeLatest(actions.GET_USER_BY_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getUserByIdService(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_USER_BY_ID_RESPONSE, data: res.data });
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
    fork(getUsersSaga),
    fork(addUsersSaga),
    fork(editUsersSaga),
    fork(deleteUsersSaga),
    fork(aprrUsersSaga),
    fork(getRoleByIdSaga)
  ]);
}
