import React from 'react';

import styles from '../styles/spinner.scss';

const Spinner = (props) => {
  return <div className={`spinner ${props.isLoading ? '' : 'invisible'}`}/>;
};

export default Spinner;
