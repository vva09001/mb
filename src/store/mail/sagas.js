import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getMails, addMails, editMails, deleteMails, getMailsId } from '../../services/mails';
import { Error, Success } from '../../helpers/notify';
import history from 'helpers/history';
import actions from './actions';

function* getMailsSaga() {
  yield takeLatest(actions.GET_MAILS_REQUEST, function*(params) {
    try {
      const res = yield getMails();
      if (res.status === 200) {
        yield put({ type: actions.GET_MAILS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getMailsIdSaga() {
  yield takeLatest(actions.GET_MAILS_BY_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getMailsId(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_MAILS_BY_ID_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addMailsSaga() {
  yield takeLatest(actions.ADD_MAILS_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addMails(data);
      if (res.status === 200) {
        Success('Thêm mới thành công');
        yield put({ type: actions.GET_MAILS_REQUEST, data: res.data });
        yield history.push('/emails/list');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* editMailsSaga() {
  yield takeLatest(actions.EDIT_MAILS_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editMails(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.GET_MAILS_REQUEST, data: res.data });
        yield history.push('/emails/list');
      } else {
        yield Error(res.message);
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
        Success('Xóa thành công');
        yield put({ type: actions.GET_MAILS_REQUEST, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getMailsSaga), fork(addMailsSaga), fork(editMailsSaga), fork(deleteMailsSaga), fork(getMailsIdSaga)]);
}
