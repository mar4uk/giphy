import {
  searchGifs
} from '../data-providers';
import { HttpError } from '../utils/Error';

export async function search(req, res, next) {
  const {
    q,
    page
  } = req.query;

  const limit = 5;

  const {
    data,
    pagination,
  } = await searchGifs({
    q,
    limit,
    offset: page * limit
  });

  if (!req.xhr) {
    next();
    return;
  }

  if (!data || !pagination) {
    next(new HttpError(500, 'Something went wrong'));
    return;
  }

  res.json({
    page: parseInt(page, 10) + 1,
    items: data,
    total: pagination.total_count
  });
};
