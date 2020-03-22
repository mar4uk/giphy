import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { reducer } from '../redux/reducers';
import { App } from '../components/App/App';

export const render = (req, res) => {
  if (req.xhr) {
    return;
  }

  const store = createStore(reducer, applyMiddleware(thunk));

  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  res.render('main', {
    state: escape(JSON.stringify(Object.assign({}, store.getState()))),
    content,
  });
};
