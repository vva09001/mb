import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { addfeedbackMail } from '../../services/backmail';
import { Error, Success } from '../../helpers/notify';
import history from 'helpers/history';
import actions from './actions';

function* addfeedbackMailSaga() {
  yield takeLatest(actions.ADD_FEEDBACKMAIL_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield addfeedbackMail(data);
      if (res.status === 200) {
        Success('Phản hồi thành công');
        yield put({ type: actions.ADD_FEEDBACKMAIL_RESPONSE, data: res.data });
        yield history.push('/form-builder/list');
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(addfeedbackMailSaga)]);
}
