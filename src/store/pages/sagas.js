import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getPages, addPages, editPages, deletePages, updatePositionPages } from '../../services/pages';
import { Error, Success } from '../../helpers/notify';
import actions from './actions';

function* getPagesSaga() {
  yield takeLatest(actions.GET_PAGES_REQUEST, function*(params) {
    try {
      const res = yield getPages();
      let data = [];

      if (res.status === 200) {
        const nest = (items, id = 0, link = 'parentId') =>
          items
            .filter(item => item[link] === id)
            .map(item => ({ ...item, title: item.name, children: nest(items, item.id), expanded: true }));

        data = nest(res.data);

        for (let index = 0; index < data.length; index++) {
          if (data[index].children !== undefined) {
            let arr = data[index].children;
            for (let i = 0; i < arr.length; i++) {
              arr[i] = { ...arr[i], title: arr[i].name };
            }
            arr.sort((a, b) => {
              return a.position - b.position;
            });
          }
        }
        data.sort((a, b) => {
          return a.position - b.position;
        });
        yield put({ type: actions.GET_PAGES_RESPONSE, data: data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addPagesSaga() {
  yield takeLatest(actions.ADD_PAGES_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addPages(data);
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
      const res = yield editPages(data);
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
      const res = yield deletePages(id);
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
      const res = yield updatePositionPages(idPage, idParent, positions);

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
    fork(updatePositionPagesSaga)
  ]);
}
