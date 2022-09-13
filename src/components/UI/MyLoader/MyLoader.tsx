import React from 'react';
import styles from './MyLoader.module.scss';

interface MyLoaderProps {
  visible: boolean;
}

const MyLoader: React.FC<MyLoaderProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.loader}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};

export default MyLoader;
