import querystring from 'query-string';

export const LOAD_ITEMS = 'LOAD_ITEMS';

export const loadItems = (q) => {
  return (dispatch, getState) => {
    const { page, search, loading } = getState();

    if (loading) return;

    dispatch({
      type: LOAD_ITEMS,
      meta: {
        status: 'pending'
      }
    });

    const isNewSearch = q !== search;

    const query = querystring.stringify({
      q,
      page: isNewSearch ? 0 : page
    });

    return fetch(`/search?${query}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
      .then(res => res.json())
      .then((data) => data.status === 'error' ? Promise.reject(data) : data)
      .then((data) => {
        return dispatch({
          type: LOAD_ITEMS,
          meta: {
            status: 'done'
          },
          payload: {
            items: data.items,
            page: data.page,
            total: data.total,
            isNewSearch,
            search: q
          }
        });
      })
      .catch(() => {
        dispatch({
          type: LOAD_ITEMS,
          meta: {
            status: 'fail'
          }
        });
      });
  }
}