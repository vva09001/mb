import { all } from 'redux-saga/effects';
import NewSaga from './news/saga';
import AuthSaga from './auth/saga';
import PageSaga from './pages/sagas';
import CategorySaga from './category/saga';
import MailSaga from './mail/sagas';
import FormBuilderSaga from './formbuilder/saga';
import MenuSaga from './menu/saga';
import BlockSaga from './block/saga';
import TagSaga from './tags/saga';
import UserSaga from './Users/sagas';
import RoleSaga from './roles/sagas';

export default function* rootSaga() {
  yield all([
    NewSaga(),
    AuthSaga(),
    PageSaga(),
    CategorySaga(),
    MailSaga(),
    FormBuilderSaga(),
    MenuSaga(),
    BlockSaga(),
    TagSaga(),
    UserSaga(),
    RoleSaga()
  ]);
}
