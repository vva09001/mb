import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getRolesService,
  addRolesService,
  editRolesService,
  deleteRolesService,
  acceptPrivilegeService,
  removePrivilegeService,
  getPrivilegeRoleService,
  getPrivilegesByGroupService
} from '../../services/roles';
import { Error, Success } from 'helpers/notify';
import actions from './actions';

function* getRolesSaga() {
  yield takeLatest(actions.GET_ROLES_REQUEST, function*(params) {
    try {
      const res = yield getRolesService();
      if (res.status === 200) {
        yield put({ type: actions.GET_ROLES_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addRolesSaga() {
  yield takeLatest(actions.ADD_ROLES_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addRolesService(data);
      if (res.status === 200) {
        yield Success('Thêm thành công');
        yield put({ type: actions.ADD_ROLES_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editRolesSaga() {
  yield takeLatest(actions.EDIT_ROLES_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield editRolesService(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_ROLES_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteRolesSaga() {
  yield takeLatest(actions.DELETE_ROLES_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteRolesService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_ROLES_RESPONSE, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* setPermissionRoleSaga() {
  yield takeLatest(actions.SET_PERMISSION_ROLE, function*(params) {
    const { id, allowData, denyData } = params;
    try {
      yield removePrivilegeService(id, denyData);
      const res = yield acceptPrivilegeService(id, allowData);
      if (res.status === 200) {
        yield Success('Xét thành công');
        yield put({ type: actions.GET_ROLES_REQUEST, data: res.data });
      } else {
        yield Error('Xét thất bại');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getPrivilegeRoleSaga() {
  yield takeLatest(actions.GET_PRIVILEGE_ROLE_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getPrivilegeRoleService(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_PRIVILEGE_ROLE_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* getPrivilegeRoleByGroupSaga() {
  yield takeLatest(actions.GET_PRIVILEGE_ROLE_BY_GROUP_REQUEST, function*(params) {
    try {
      const res = yield getPrivilegesByGroupService();
      if (res.status === 200) {
        yield put({ type: actions.GET_PRIVILEGE_ROLE_BY_GROUP_RESPONSE, data: res.data });
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
    fork(getRolesSaga),
    fork(addRolesSaga),
    fork(editRolesSaga),
    fork(deleteRolesSaga),
    fork(setPermissionRoleSaga),
    fork(getPrivilegeRoleSaga),
    fork(getPrivilegeRoleByGroupSaga)
  ]);
}
