import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getMenus,
  addMenus,
  editMenus,
  deleteMenus,
  getMenuItems,
  addMenuItems,
  editMenuItems,
  deleteMenuItems,
  updatePositionMenuItemsService
} from 'services/menu';
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
function* getMenuItemsSaga() {
  yield takeLatest(actions.GET_MENUITEMS_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getMenuItems(id);
      let data = [];
      if (res.status === 200) {
        const nest = (items, id = 0, link = 'parentId') => {
          return items
            .filter(item => item[link] === id)
            .map(item => ({
              ...item,
              title: item.name,
              children: nest(items.sort((a, b) => a.position - b.position), item.id),
              expanded: true
            }));
        };
        data = nest(res.data);
        yield put({ type: actions.GET_MENUITEMS_RESPONSE, data: data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addMenuItemsSaga() {
  yield takeLatest(actions.ADD_MENUITEMS_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addMenuItems(data);
      if (res.status === 200) {
        Success('Thêm Thành Công');
        yield put({ type: actions.ADD_MENUITEMS_RESPONSE, data: res.data });
        history.push('/menu/edit');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editMenuItemsSaga() {
  yield takeLatest(actions.EDIT_MENUITEMS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield editMenuItems(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_MENUITEMS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteMenuItemsSaga() {
  yield takeLatest(actions.DELETE_MENUITEMS_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteMenuItems(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_MENUITEMS_RESPONSE, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* updatePositionMenuItemsSaga() {
  yield takeLatest(actions.UPDATE_POSITION_MENUITEM, function*(params) {
    const { idMenuItem, idParent, positions } = params;
    try {
      const res = yield updatePositionMenuItemsService(idMenuItem, idParent, positions);

      if (res.status === 200) {
        Success(' Sửa thành công');
        yield put({ type: actions.GET_MENUITEMS_REQUEST, data: res.data });
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
    fork(getMenusSaga),
    fork(addMenusSaga),
    fork(editMenusSaga),
    fork(deleteMenusSaga),
    fork(getMenuItemsSaga),
    fork(addMenuItemsSaga),
    fork(editMenuItemsSaga),
    fork(deleteMenuItemsSaga),
    fork(updatePositionMenuItemsSaga)
  ]);
}
