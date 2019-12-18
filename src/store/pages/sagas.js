import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {
  getPagesService,
  addPagesService,
  editPagesService,
  deletePagesService,
  updatePositionPagesService,
  apprPagesService
} from '../../services/pages';
import { Error, Success } from '../../helpers/notify';
import actions from './actions';

function* getPagesSaga() {
  yield takeLatest(actions.GET_PAGES_REQUEST, function*(params) {
    try {
      const res = yield getPagesService();
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
        yield put({ type: actions.GET_PAGES_RESPONSE, data: data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getAllPagesSaga() {
  yield takeLatest(actions.GET_ALL_PAGES_REQUEST, function*(params) {
    try {
      const res = yield getPagesService();
      if (res.status === 200) {
        yield put({ type: actions.GET_ALL_PAGES_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* apprPagesSaga() {
  yield takeLatest(actions.APPR_PAGES_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield apprPagesService(data);
      if (res.status === 200) {
        Success('Duyệt thành công');
        yield put({ type: actions.GET_ALL_PAGES_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối server');
    }
  });
}

function* addPagesSaga() {
  yield takeLatest(actions.ADD_PAGES_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addPagesService(data);
      if (res.status === 200) {
        Success('Thêm thành công');
        yield put({ type: actions.GET_PAGES_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editPagesSaga() {
  yield takeLatest(actions.EDIT_PAGES_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editPagesService(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.GET_PAGES_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deletePagesSaga() {
  yield takeLatest(actions.DELETE_PAGES_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deletePagesService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.GET_PAGES_REQUEST, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* updatePositionPagesSaga() {
  yield takeLatest(actions.UPDATE_POSITION_PAGE, function*(params) {
    const { idPage, idParent, positions } = params;
    try {
      const res = yield updatePositionPagesService(idPage, idParent, positions);

      if (res.status === 200) {
        Success(' Sửa thành công');
        yield put({ type: actions.GET_PAGES_REQUEST, data: res.data });
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
    fork(getPagesSaga),
    fork(addPagesSaga),
    fork(editPagesSaga),
    fork(deletePagesSaga),
    fork(updatePositionPagesSaga),
    fork(getAllPagesSaga),
    fork(apprPagesSaga)
  ]);
}
