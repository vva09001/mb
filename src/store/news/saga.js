import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getNews, addNews, editNews, deleteNews } from 'services/news';
import { Error, Success } from 'helpers/notify';
import actions from './actions';

function* getNewsSaga() {
  yield takeLatest(actions.GET_NEWS_REQUEST, function*(params) {
    try {
      const res = yield getNews();
      if (res.status === 200) {
        yield put({ type: actions.GET_NEWS_RESPONSE, data: res.data });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function* addNewsSaga() {
  yield takeLatest(actions.ADD_NEWS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield addNews(data);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.ADD_NEWS_RESPONSE, data: res.data });
      } else {
        yield onFail();
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function* editNewsSaga() {
  yield takeLatest(actions.EDIT_NEWS_REQUEST, function*(params) {
    const { data, onSuccess, onFail } = params;
    try {
      const res = yield editNews(data);
      console.log(res);
      if (res.status === 200) {
        yield onSuccess();
        yield put({ type: actions.EDIT_NEWS_RESPONSE, data: res.data });
      } else {
        yield onFail();
        console.log(res);
      }
    } catch (error) {
      console.log(error);
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
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getNewsSaga), fork(addNewsSaga), fork(editNewsSaga), fork(deleteNewsSaga)]);
}
