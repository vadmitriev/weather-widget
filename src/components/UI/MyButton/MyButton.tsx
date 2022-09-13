import React from 'react';
import styles from './MyButton.module.scss';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface MyButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  size?: 's' | 'm' | 'l';
}

const MyButton: React.FC<MyButtonProps> = ({ children, size = 'm' }) => {
  return (
    <button
      className={cn(styles.btn, {
        small: size === 's',
        middle: size === 'm',
        large: size === 'l',
      })}
    >
      {children}
    </button>
  );
};

export default MyButton;
