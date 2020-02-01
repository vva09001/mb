import actions from './actions';
import { takeLatest, put, all, fork } from 'redux-saga/effects';
import history from 'helpers/history';
import { login } from 'services/auth';
import { Error } from 'helpers/notify';
import { getToken } from '../../helpers/localStorage';

function* loginSaga() {
  yield takeLatest(actions.LOGIN_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield login(data);
      if (res.status === 200) {
        yield localStorage.setItem('logged', true);
        yield put({ type: actions.LOGIN_RESPONSE, data: res.data });    
     if(getToken() !== undefined){
        yield history.push('/');}
        else{
          yield put({ type: actions.LOGIN_REQUEST, data: data });
        }
      } else {
        Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
