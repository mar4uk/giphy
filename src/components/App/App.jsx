import React from 'react';
import styles from './styles.scss';

export const App = () => {
  return (
    <div className={styles.container}>
      <form action="/search">
        <input name="q" type="text" />
        <button type="submit">Search!</button>
      </form>
    </div>
  )
};