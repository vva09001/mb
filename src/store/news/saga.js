import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getNews, addNews, editNews, deleteNews, aprrNews, getNewsId } from 'services/news';
import { Error, Success } from 'helpers/notify';
import actions from './actions';

function* getNewsSaga() {
  yield takeLatest(actions.GET_NEWS_REQUEST, function*(params) {
    try {
      const res = yield getNews();
      if (res.status === 200) {
        yield put({ type: actions.GET_NEWS_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* getNewsIdSaga() {
  yield takeLatest(actions.GET_NEWS_BY_ID_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getNewsId(id);
      if (res.status === 200) {
        yield put({ type: actions.GET_NEWS_BY_ID_RESPONSE, data: res.data });
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* addNewsSaga() {
  yield takeLatest(actions.ADD_NEWS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      console.log(data);
      const res = yield addNews(data);
      console.log(res.data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.ADD_NEWS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* aprrNewsSaga() {
  yield takeLatest(actions.APRR_NEWS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield aprrNews(data);
      console.log(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.APRR_NEWS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* editNewsSaga() {
  yield takeLatest(actions.EDIT_NEWS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {      
      const res = yield editNews(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_NEWS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* deleteNewsSaga() {
  yield takeLatest(actions.DELETE_NEWS_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield deleteNews(id);
      if (res.status === 200) {
        yield Success('Xóa thành công');
        yield put({ type: actions.DELETE_NEWS_RESPONSE, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getNewsSaga),
    fork(addNewsSaga),
    fork(editNewsSaga),
    fork(deleteNewsSaga),
    fork(aprrNewsSaga),
    fork(getNewsIdSaga)
  ]);
}
