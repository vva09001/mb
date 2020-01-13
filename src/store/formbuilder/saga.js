import actions from './actions';
import { takeLatest, put, all, fork } from 'redux-saga/effects';
import {
  getFormbuilderService,
  createFormbuilderService,
  editFormbuilderService,
  deleteFormbuilderService,
  getFormbuilderByIdService
} from 'services/formbuilder';
import history from 'helpers/history';
import { Error, Success } from 'helpers/notify';

function* getFormSaga() {
  yield takeLatest(actions.GET_FORM_REQUEST, function*(params) {
    try {
      const res = yield getFormbuilderService();
      if (res.status === 200) {
        yield put({ type: actions.GET_FORM_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getFormIdSaga() {
  yield takeLatest(actions.GET_FORM_BY_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getFormbuilderByIdService(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_FORM_BY_ID_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* createFormSaga() {
  yield takeLatest(actions.CREATE_FROM_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield createFormbuilderService(data);
      if (res.status === 200) {
        yield Success('Tạo thành công');
        yield put({ type: actions.CREATE_FROM_RESPONSE, data: res.data });
        yield history.push('/form-builder/list');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editFormSaga() {
  yield takeLatest(actions.EDIT_FORM_REQUEST, function*(params) {
    const { id, data } = params;
    try {
      const res = yield editFormbuilderService(id, data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_FORM_RESPONSE, data: res.data, id: id });
        yield history.push('/form-builder/list');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteFormSaga() {
  yield takeLatest(actions.DELETE_FORM_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteFormbuilderService(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_FORM_RESPONSE, data: id });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getFormSaga), fork(createFormSaga), fork(editFormSaga), fork(deleteFormSaga), fork(getFormIdSaga)]);
}
