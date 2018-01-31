import React from 'react';
import styles from '../styles/Spinner.scss';

const Spinner = (props) => {
  return <div className={`spinner ${props.isLoading ? '' : 'invisible'}`}/>;
};

export default Spinner;
