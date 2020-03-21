import { reducer } from './';

import {
  LOAD_ITEMS,
} from '../../actions';

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
      page: 0,
      total: 0,
      search: '',
      loading: false
    })
  });

  it(`should handle ${LOAD_ITEMS} new search`, () => {
    const prevState = {
      items: [],
      page: 0,
      total: 0,
      search: '',
      loading: false
    };
    const action = {
      type: LOAD_ITEMS,
      meta: {
        status: 'done'
      },
      payload: {
        items: [1, 2, 3],
        page: 1,
        total: 6,
        isNewSearch: true,
        search: 'kittens'
      }
    };
    const nextState = {
      items: [1, 2, 3],
      page: 1,
      total: 6,
      search: 'kittens',
      loading: false
    };

    expect(reducer(prevState, action)).toEqual(nextState)
  })

  it(`should handle ${LOAD_ITEMS} current search more items`, () => {
    const prevState = {
      items: [1, 2, 3],
      page: 1,
      total: 6,
      search: 'kittens',
      loading: false
    };
    const action = {
      type: LOAD_ITEMS,
      meta: {
        status: 'done'
      },
      payload: {
        items: [4, 5, 6],
        page: 2,
        total: 6,
        isNewSearch: false,
        search: 'kittens'
      }
    };
    const nextState = {
      items: [1, 2, 3, 4, 5, 6],
      page: 2,
      total: 6,
      search: 'kittens',
      loading: false
    };

    expect(reducer(prevState, action)).toEqual(nextState)
  })

  it(`should handle ${LOAD_ITEMS} new search with changed query`, () => {
    const prevState = {
      items: [1, 2, 3, 4, 5, 6],
      page: 1,
      total: 6,
      search: 'kittens',
      loading: false
    };
    const action = {
      type: LOAD_ITEMS,
      meta: {
        status: 'done'
      },
      payload: {
        items: [9, 10, 11],
        page: 1,
        total: 3,
        isNewSearch: true,
        search: 'dogs'
      }
    };
    const nextState = {
      items: [9, 10, 11],
      page: 1,
      total: 3,
      search: 'dogs',
      loading: false
    };

    expect(reducer(prevState, action)).toEqual(nextState)
  })

  it(`should handle ${LOAD_ITEMS} error`, () => {
    const prevState = {
      items: [1, 2, 3, 4, 5, 6],
      page: 1,
      total: 6,
      search: 'kittens',
      loading: false
    };
    const action = {
      type: LOAD_ITEMS,
      meta: {
        status: 'fail'
      }
    };

    expect(reducer(prevState, action)).toEqual(prevState)
  })

  it(`should handle ${LOAD_ITEMS} pending`, () => {
    const prevState = {
      items: [],
      page: 0,
      total: 0,
      search: '',
      loading: false
    };
    const action = {
      type: LOAD_ITEMS,
      meta: {
        status: 'pending'
      },
    };
    const nextState = {
      items: [],
      page: 0,
      total: 0,
      search: '',
      loading: true
    };

    expect(reducer(prevState, action)).toEqual(nextState)
  })
});
