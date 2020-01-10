import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import NewReducer from './news/reducers';
import AuthReducer from './auth/reducers';
import PageReducer from './pages/reducers';
import CategoryReducer from './category/reducers';
import MailReducer from './mail/reducers';
import FormBuilderReducer from './formbuilder/reducers';
import MenuReducer from './menu/reducers';
import BlockReducer from './block/reducers';
import TagReducer from './tags/reducers';
import UserReducer from './Users/reducers';
import RoleReducer from './roles/reducers';
import SilderReducer from './slider/reducers';
import SettingReducer from './setting/reducers';
import MediaReducer from './media/reducers';
import FeedbackReducer from './backmail/reducers';
import StoreFontReducer from './storefont/reducer';
import CountryReducer from './country/reducers';
import InterestRateReducer from './interestrate/reducers';

const reducers = combineReducers({
  NewReducer,
  AuthReducer,
  PageReducer,
  CategoryReducer,
  MailReducer,
  FormBuilderReducer,
  MenuReducer,
  BlockReducer,
  TagReducer,
  UserReducer,
  RoleReducer,
  SilderReducer,
  SettingReducer,
  CountryReducer,
  StoreFontReducer,
  MediaReducer,
  FeedbackReducer,
  InterestRateReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AuthReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;
