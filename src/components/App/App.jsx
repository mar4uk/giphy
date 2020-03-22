import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import LazyLoad from 'react-lazyload';
import { Placeholder } from '../Placeholder/Placeholder';
import {
  loadItems
} from '../../actions';
import { Spinner } from '../Spinner/Spinner';

require('./styles.scss');

export const App = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const {
    items,
    loading,
  } = useSelector(state => ({
    items: state.items,
    loading: state.loading
  }));

  const resultsRef = useRef(null);

  const onScroll = useCallback(debounce(() => {
    const current = resultsRef.current;
    if (current) {
      if (window.innerHeight + window.scrollY > current.clientHeight + current.offsetTop - 200) {
        dispatch(loadItems(query))
      }
    }
  }, 200), [query])

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [query]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loadItems(query))
  }

  const onInputChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="app__container">
      <div className="app__search">
        <form className="app__form" action="/search" onSubmit={onFormSubmit}>
        <input className="app__form-input form-control" name="q" type="text" onChange={onInputChange} />
        <button className="app__form-submit btn btn-secondary" type="submit">Search!</button>
      </form>
      </div>
      <ul className="app__results" ref={resultsRef}>
        {items.map((item) => (
          <li key={item.id} className="app__results-item">
            <a href={item.url} className="app__results-item-link">
              <LazyLoad height={200} offset={100} once placeholder={<Placeholder />}>
                <img src={item.images.fixed_width.webp}/>
              </LazyLoad>
            </a>
          </li>
        ))}
        {loading && <li className="app__results-item"><Spinner className="app__spinner" /></li>}
      </ul>
    </div>
  )
};