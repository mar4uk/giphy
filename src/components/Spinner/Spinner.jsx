import React from 'react';
import cs from 'classnames';

require('./styles.scss');

export const Spinner = (props) => {
  const {
    className
  } = props;
  return <div className={cs('spinner', className)} />
}