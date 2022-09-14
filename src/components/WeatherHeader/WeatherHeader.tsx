import React from 'react';
import { MyButton } from '../UI';
import styles from './WeatherHeader.module.scss';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface WeatherHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  showSettings: boolean;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  showSettings,
  ...props
}) => {
  return (
    <div className={styles.wrapper} {...props}>
      {showSettings ? (
        <MyButton>
          <CloseOutlined />
        </MyButton>
      ) : (
        <MyButton>
          <SettingOutlined />
        </MyButton>
      )}
    </div>
  );
};

export default WeatherHeader;
