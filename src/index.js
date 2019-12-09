import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import './helpers/initFA';
import './helpers/i18n';
import '../node_modules/noty/lib/noty.css';
import '../node_modules/noty/lib/themes/mint.css';
import 'styles/index.scss';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import reducers from './store/reducer';
import saga from './store/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={null}>
        <Main>
          <App />
        </Main>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById('main')
);
