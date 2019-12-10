import { all } from 'redux-saga/effects';
import NewSaga from './news/saga';
import AuthSaga from './auth/saga';

export default function* rootSaga() {
  yield all([NewSaga(), AuthSaga()]);
}
