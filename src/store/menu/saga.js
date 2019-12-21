import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getMenus, addMenus, editMenus, deleteMenus } from 'services/menu';
import { Error, Success } from 'helpers/notify';
import actions from './actions';
import history from 'helpers/history';

function* getMenusSaga() {
  yield takeLatest(actions.GET_MENUS_REQUEST, function*(params) {
    try {
      const res = yield getMenus();
      if (res.status === 200) {
        yield put({ type: actions.GET_MENUS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addMenusSaga() {
  yield takeLatest(actions.ADD_MENUS_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addMenus(data);
      if (res.status === 200) {
        Success('Thêm Thành Công');
        yield put({ type: actions.ADD_MENUS_RESPONSE, data: res.data });
        history.push('/menu/edit');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editMenusSaga() {
  yield takeLatest(actions.EDIT_MENUS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield editMenus(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_MENUS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteMenusSaga() {
  yield takeLatest(actions.DELETE_MENUS_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteMenus(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_MENUS_RESPONSE, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getMenusSaga), fork(addMenusSaga), fork(editMenusSaga), fork(deleteMenusSaga)]);
}
