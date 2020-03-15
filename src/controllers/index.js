import {
  searchGifs
} from '../data-providers';

export async function search(req, res, next) {
  const {
    q
  } = req.query;

  const limit = 5;

  const {
    data,
  } = await searchGifs({
    q,
    limit,
    offset: 0
  });

  if (!req.xhr) {
    next();
    return;
  }

  res.json({
    data
  });
};
