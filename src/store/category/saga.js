import actions from './actions';
import { takeLatest, put, all, fork } from 'redux-saga/effects';
import { Error, Success } from 'helpers/notify';
import {
  getCategoryService,
  addCategoryService,
  editCategoryService,
  deleteCategoryService,
  updatePositionService
} from 'services/category';

function* getCategorySaga() {
  yield takeLatest(actions.GET_CATEGORY_REQUEST, function*(params) {
    try {
      const res = yield getCategoryService();
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
        yield put({ type: actions.GET_CATEGORY_RESPONSE, data: data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addCategorySaga() {
  yield takeLatest(actions.ADD_CATEGORY_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addCategoryService(data);
      if (res.status === 200) {
        Success('Thêm thành công');
        yield put({ type: actions.GET_CATEGORY_REQUEST, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editCategorySaga() {
  yield takeLatest(actions.EDIT_CATEGORY_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editCategoryService(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.GET_CATEGORY_REQUEST, data: res.data });
      } else {
        Error(res.message);
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

function* deleteCategorySaga() {
  yield takeLatest(actions.DELETE_CATEGORY_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteCategoryService(id);
      if (res.status === 200) {
        Success('Xóa thành công');
        yield put({ type: actions.DELETE_CATEGORY_RESPONSE, data: res.data });
      } else {
        Error(res.message);
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

function* updatePositionSaga() {
  yield takeLatest(actions.UPDATE_POSITION, function*(params) {
    const { idCategory, idParent, positions } = params;
    try {
      const res = yield updatePositionService(idCategory, idParent, positions);
      if (res.status === 200) {
        Success('Sửa thành công');
        yield put({ type: actions.GET_CATEGORY_REQUEST, data: res.data });
      } else {
        Error(res.message);
      }
    } catch (error) {
      Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getCategorySaga),
    fork(addCategorySaga),
    fork(editCategorySaga),
    fork(deleteCategorySaga),
    fork(updatePositionSaga)
  ]);
}
