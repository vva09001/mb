import { takeLatest, put, fork, all } from 'redux-saga/effects';
import actions from './actions';

function* getNewsSaga() {
  yield takeLatest(actions.GET_NEWS_REQUEST, function*(params) {
    try {
      const data = [];
      yield put({ type: actions.GET_NEWS_RESPONSE, data: data });
    } catch (error) {}
  });
}

export default function* rootSaga() {
  yield all([fork(getNewsSaga)]);
}
