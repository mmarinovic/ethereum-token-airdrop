import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './index.css';

import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import reducers from './redux/reducers';
import { watchSaga } from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
