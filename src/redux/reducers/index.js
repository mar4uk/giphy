import update from 'immutability-helper';
import {
  LOAD_ITEMS
} from '../../actions';

const initialState = {
  items: [],
  page: 0,
  total: 0,
  search: '',
  loading: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      if (action.meta.status === 'done') {
        const { items, page, total, isNewSearch, search } = action.payload;
        if (isNewSearch) {
          return update(state, {
            items: { $set: items },
            page: { $set: page },
            total: { $set: total },
            search: { $set: search },
            loading: { $set: false }
          });
        } else {
          return update(state, {
            items: { $push: items },
            page: { $set: page },
            loading: { $set: false }
          });
        }
      } else if (action.meta.status === 'pending') {
        return update(state, {
          loading: { $set: true }
        });
      } else {
        return update(state, {
          loading: { $set: false }
        });
      }
    }
  }
  return state;
};