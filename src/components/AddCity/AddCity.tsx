import React, { useRef, useState, useEffect } from 'react';
import styles from './AddCity.module.scss';
import { EnterOutlined } from '@ant-design/icons';
import MyButton from '../UI/MyButton/MyButton';

interface AddCityProps {}

const AddCity: React.FC<AddCityProps> = () => {
  const store = useWeatherStore();
  const [showError, setShowError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await store.addCity();
      setShowError(false);
      setInputValue('');
    }
  };

  return (
    <div className={styles.wrapper}>
      {store.errorAddCity && showError && (
        <div className={styles.error}>{store.errorAddCity}</div>
      )}
      <div className={styles.controls}>
        <input
          ref={inputRef}
          placeholder="Add Location"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          value={inputValue}
        />
      </div>
    </div>
  );
};

export default AddCity;
