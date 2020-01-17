import actions from './actions';
import { takeLatest, put, fork, all } from 'redux-saga/effects';
import { getStoreFont, editStoreFontGeneral, editStoreFontLogo, editStoreFontSocialLink } from 'services/storefont';
import { Error, Success } from 'helpers/notify';

function* getStoreFontSaga() {
  yield takeLatest(actions.GET_STORE_FONT_REQUEST, function*(params) {
    const { name } = params;
    if (name === 'general') {
      try {
        const res = yield getStoreFont(name);
        if (res.status === 200) {
          yield put({ type: actions.GET_GENERAL_RESPONE, data: res.data });
        } else {
          yield Error(res.message);
        }
      } catch (error) {
        yield Error('Không thể kết nối đến server');
      }
    } else {
      if (name === 'logo') {
        try {
          const res = yield getStoreFont(name);
          if (res.status === 200) {
            yield put({ type: actions.GET_LOGO_RESPONE, data: res.data });
          } else {
            yield Error(res.message);
          }
        } catch (error) {
          yield Error('Không thể kết nối đến server');
        }
      } else {
        try {
          const res = yield getStoreFont(name);
          if (res.status === 200) {
            yield put({ type: actions.GET_SOCIALLINK_RESPONSE, data: res.data });
          } else {
            yield Error(res.message);
          }
        } catch (error) {
          yield Error('Không thể kết nối đến server');
        }
      }
    }
  });
}
function* editStoreFontGeneralSaga() {
  yield takeLatest(actions.EDIT_STORE_FONT_GENERAL_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editStoreFontGeneral(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_STORE_FONT_GENERAL_RESPONSE, data: res.data });
        // yield window.location.reload();
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* editStoreFontLogoSaga() {
  yield takeLatest(actions.EDIT_STORE_FONT_LOGO_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editStoreFontLogo(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_STORE_FONT_LOGO_RESPONSE, data: res.data });
        // yield window.location.reload();
      } else {
        yield Error(res.message);
      }
    } catch (error) {
      yield Error('Không thể kết nối đến server');
    }
  });
}
function* editStoreFontSocialLinkSaga() {
  yield takeLatest(actions.EDIT_STORE_FONT_SOCIALLINK_REQUEST, function*(params) {
    const { data } = params;
    try {
      const res = yield editStoreFontSocialLink(data);
      if (res.status === 200) {
        yield Success('Sửa thành công');
        yield put({ type: actions.EDIT_STORE_FONT_SOCIALLINK_RESPONSE, data: res.data });
        // yield window.location.reload();
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
    fork(getStoreFontSaga),
    fork(editStoreFontGeneralSaga),
    fork(editStoreFontLogoSaga),
    fork(editStoreFontSocialLinkSaga)
  ]);
}
