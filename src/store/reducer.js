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

const reducers = combineReducers({
  NewReducer,
  AuthReducer,
  PageReducer,
  CategoryReducer,
  MailReducer,
  FormBuilderReducer,
  MenuReducer,
  BlockReducer,
  TagReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AuthReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;
