import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import NewReducer from './news/reducers';
import AuthReducer from './auth/reducers';
import PageReducer from './pages/reducers';
import CategoryReducer from './category/reducers';

const reducers = combineReducers({
  NewReducer,
  AuthReducer,
  PageReducer,
  CategoryReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AuthReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;
