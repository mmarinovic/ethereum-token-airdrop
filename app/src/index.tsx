import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';

import reducers from './redux/reducers';
import { watchSaga } from './redux/sagas';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
