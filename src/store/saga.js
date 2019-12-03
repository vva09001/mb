import { all } from 'redux-saga/effects';
import NewSaga from './news/saga';

export default function* rootSaga() {
  yield all([NewSaga()]);
}
