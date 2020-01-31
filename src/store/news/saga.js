import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getNews, addNews, editNews, deleteNews, aprrNews, getNewsId, getNewByCategoryID } from 'services/news';
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
      const res = yield addNews(data);
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
        yield put({ type: actions.GET_NEWS_REQUEST, data: id });
      } else {
        yield Error('Xóa lỗi');
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}

function* getNewsByCategorySaga() {
  yield takeLatest(actions.GET_NEW_BY_CATEGORY_REQUEST, function*(params) {
    const { id } = params;
    try {
      const res = yield getNewByCategoryID(id);
      if (res.status === 200) {
        // value: 'AL', label: 'Alabama'
        let data = res.data.map(news => {
          return {
            ...news,
            label: news.title,
            value: JSON.stringify({
              categoryID: id,
              newsID: news.newsId,
              name: news.title,
              url: news.url,
              description: news.shortDescription,
              image:
                news.base_image === null
                  ? `https://th2dev.mangoads.com.vn/themes/storefront/public/images/image.svg?v=5e12e47624638`
                  : news.base_image
            })
          };
        });
        yield put({ type: actions.GET_NEW_BY_CATEGORY_RESPONSE, data: data });
      } else {
        yield Error(res.message);
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
    fork(getNewsIdSaga),
    fork(getNewsByCategorySaga)
  ]);
}
