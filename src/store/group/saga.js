import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getGroupService,
  getGroupByIdService,
  getGroupByUser,
  createGroupService,
  editGroupService,
  deleteGroupService
} from 'services/group';
import history from 'helpers/history';
import { Error, Success } from 'helpers/notify';
import actions from './actions';
import { map } from 'lodash';

function* getGroupSaga() {
  yield takeLatest(actions.GET_GROUP_REQUEST, function*(params) {
    try {
      const res = yield getGroupService();
      if (res.status === 200) {
        yield put({ type: actions.GET_GROUP_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getGroupByIdSaga() {
  yield takeLatest(actions.GET_GROUP_BY_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getGroupByIdService(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_GROUP_BY_ID_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getGroupByUserSaga() {
  yield takeLatest(actions.GET_GROUP_BY_USER_REQUEST, function*(params) {
    try {
      const res = yield getGroupByUser();
      if (res.status === 200) {
        const getUnique = (arr, comp) => {
          const unique = arr
            .map(e => e[comp])

            .map((e, i, final) => final.indexOf(e) === i && i)

            .filter(e => arr[e])
            .map(e => arr[e]);

          return unique;
        };
        let datacategory = [];
        map(res.data, values => {
          Array.prototype.push.apply(datacategory, values.category);
        });
        yield put({ type: actions.GET_GROUP_BY_USER_RESPONSE, data: res.data });
        yield put({ type: actions.GET_CATEGORIES_BY_GROUP, data: getUnique(datacategory, 'id') });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addGroupSaga() {
  yield takeLatest(actions.ADD_GROUP_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createGroupService(data);
      if (res.status === 200) {
        yield put({ type: actions.ADD_GROUP_RESPONSE, data: res.data });
        yield history.push('/group');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editGroupSaga() {
  yield takeLatest(actions.EDIT_GROUP_REQUEST, function*(params) {
    const { id, data } = params;
    try {
      const res = yield editGroupService(id, data);
      if (res.status === 200) {
        yield put({ type: actions.EDIT_GROUP_RESPONSE, data: res.data });
        yield history.push('/group');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteGroupSaga() {
  yield takeLatest(actions.DELETE_GROUP_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteGroupService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.GET_GROUP_REQUEST, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getGroupSaga),
    fork(getGroupByIdSaga),
    fork(getGroupByUserSaga),
    fork(addGroupSaga),
    fork(editGroupSaga),
    fork(deleteGroupSaga)
  ]);
}
