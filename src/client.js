import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './redux/reducers';
import { App } from './components/App/App';

const initialState = JSON.parse(unescape(window.__INITIAL_STATE__));
delete window.__INITIAL_STATE__;

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app-container'));
