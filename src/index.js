import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { local } from 'store2';

import App from './components/app';
import reducers from './reducers';
import Globals from './globals';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const initialState = {
  code: local.get('code')
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, initialState)}>
    <App />
  </Provider>
  , document.querySelector('.render'));
