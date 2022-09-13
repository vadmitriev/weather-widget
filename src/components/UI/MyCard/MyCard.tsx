import React from 'react';
import styles from './MyCard.module.scss';

interface MyCardProps {
  children: React.ReactNode;
}

const MyCard: React.FC<MyCardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default MyCard;
