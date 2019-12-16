import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getMails, addMails, editMails, deleteMails } from '../../services/mails';
import { Error, Success } from '../../helpers/notify';
import actions from './actions';

function* getMailsSaga() {
  yield takeLatest(actions.GET_MAILS_REQUEST, function*(params) {
    try {
      const res = yield getMails();
      if (res.status === 200) {
        yield put({ type: actions.GET_MAILS_RESPONSE, data: res.data });
      } else {
        yield Error(res.error);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* addMailsSaga() {
  yield takeLatest(actions.ADD_MAILS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield addMails(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.ADD_MAILS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.error);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* editMailsSaga() {
  yield takeLatest(actions.EDIT_MAILS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield editMails(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_MAILS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.error);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* deleteMailsSaga() {
  yield takeLatest(actions.DELETE_MAILS_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteMails(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_MAILS_RESPONSE, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getMailsSaga), fork(addMailsSaga), fork(editMailsSaga), fork(deleteMailsSaga)]);
}
