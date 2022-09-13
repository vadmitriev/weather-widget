import React from 'react';
import styles from './Error.module.scss';

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Произошла ошибка</div>
      <div className={styles.content}>{error}</div>
    </div>
  );
};

export default Error;
