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
import SliderSaga from './slider/saga';
import SettingSaga from './setting/saga';
import MediaSaga from './media/saga';
import FeedbackSaga from './backmail/sagas';
import StoreFontSaga from './storefont/saga';
import NetworkSaga from './network/saga';
import CountrySaga from './country/saga';
import InterestSaga from './interestrate/saga';
import ExChangeSaga from './exchangeRate/saga';
import GroupSaga from './group/saga';
import ProvinceSaga from './province/saga';
import DistrictSaga from './district/saga';

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
    RoleSaga(),
    SliderSaga(),
    SettingSaga(),
    CountrySaga(),
    StoreFontSaga(),
    MediaSaga(),
    FeedbackSaga(),
    NetworkSaga(),
    InterestSaga(),
    ExChangeSaga(),
    GroupSaga(),
    ProvinceSaga(),
    DistrictSaga()
  ]);
}
