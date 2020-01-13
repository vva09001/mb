import { takeLatest, put, fork, all } from 'redux-saga/effects';
import {getfeedbackMailsId, addfeedbackMail, editfeedbackMail  } from '../../services/backmail';
import { Error, Success } from '../../helpers/notify';
import history from 'helpers/history';
import actions from './actions';

function* addfeedbackMailSaga() {
  yield takeLatest(actions.ADD_FEEDBACK_MAIL_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addfeedbackMail(data);
      if (res.status === 200) {
        Success('Thông tin đã được lưu');
        yield put({ type: actions.ADD_FEEDBACK_MAIL_RESPONSE, data: res.data });
        yield history.push('/form-builder/list');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getfeedbackMailsIdSaga() {
  yield takeLatest(actions.GET_RELY_MAILS_BY_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getfeedbackMailsId(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_RELY_MAILS_BY_ID_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editfeedbackMailSaga() {
  yield takeLatest(actions.EDIT_FEEDBACK_MAILS_REQUEST, function*(params) {
    const { data } = params;
    try {
      console.log(data);
      const res = yield editfeedbackMail(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_FEEDBACK_MAILS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(addfeedbackMailSaga),fork(getfeedbackMailsIdSaga),fork(editfeedbackMailSaga)]);
}
