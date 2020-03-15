import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../components/App/App';

export const render = (req, res) => {
  if (req.xhr) {
    return;
  }

  const content = ReactDOMServer.renderToString(
    <App />
  );

  res.render('main', {
    content,
  });
};
