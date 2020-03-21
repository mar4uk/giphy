import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock-jest';

import {
  loadItems,
  LOAD_ITEMS
} from './';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(`Action ${LOAD_ITEMS}`, () => {
  afterEach(() => {
    fetchMock.restore();
  })

  it(`creates ${LOAD_ITEMS} done when fetching items has been done`, () => {
    fetchMock.getOnce('/search?page=0&q=kittens', {
      body: { items: [1, 2, 3], page: 1, total: 3, loading: false },
      headers: {
        'content-type': 'application/json'
      }
    })
    const expectedActions = [
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'pending'
        },
      },
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'done'
        },
        payload: {
          items: [1, 2, 3],
          page: 1,
          total: 3,
          isNewSearch: true,
          search: 'kittens'
        }
      },
    ];

    const store = mockStore({ items: [], page: 0, total: 0, search: '', loading: false })

    return store.dispatch(loadItems('kittens')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  })

  it(`creates ${LOAD_ITEMS} done when fetching items has been done, next page for current search`, () => {
    fetchMock.getOnce('/search?page=1&q=kittens', {
      body: { items: [4, 5, 6], page: 2, total: 6, loading: false },
      headers: {
        'content-type': 'application/json'
      }
    })
    const expectedActions = [
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'pending'
        }
      },
      {
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
      },
    ];

    const store = mockStore({ items: [1,2,3], page: 1, total: 6, search: 'kittens', loading: false })

    return store.dispatch(loadItems('kittens')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  })

  it(`creates ${LOAD_ITEMS} done when fetching items has been done with changed search`, () => {
    fetchMock.getOnce('/search?page=0&q=dogs', {
      body: { items: [1, 2, 3], page: 1, total: 6, loading: false },
      headers: {
        'content-type': 'application/json'
      }
    })
    const expectedActions = [
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'pending'
        }
      },
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'done'
        },
        payload: {
          items: [1, 2, 3],
          page: 1,
          total: 6,
          isNewSearch: true,
          search: 'dogs'
        }
      },
    ];

    const store = mockStore({ items: [4, 5, 6], page: 1, total: 3, search: 'kittens', loading: false })

    return store.dispatch(loadItems('dogs')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  })

  it(`creates ${LOAD_ITEMS} fail when fetching items has been done with error`, () => {
    fetchMock.getOnce('/search?page=0&q=kittens', {
      body: {
        status: 'error',
        statusCode: 500,
        message: 'Internal error'
      },
      headers: {
        'content-type': 'application/json'
      }
    })
    const expectedActions = [
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'pending'
        }
      },
      {
        type: LOAD_ITEMS,
        meta: {
          status: 'fail'
        }
      },
    ];

    const store = mockStore({ items: [], page: 0, total: 0, search: '' })

    return store.dispatch(loadItems('kittens')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  })
})