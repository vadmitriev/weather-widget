import React, { useEffect } from 'react';
import { AddCity, WeatherCard } from '../../components';
import { City } from '../../interfaces';
import useWeatherStore from '../../stores/weather/weather';
import styles from './Weather.module.scss';

interface WeatherViewProps {}

const WeatherView: React.FC<WeatherViewProps> = () => {
  const store = useWeatherStore();

  useEffect(() => {
    if (!store.cities.length) {
      store.getLocation();
    }
    store.loadDataForAllCities();
  }, []);

  return (
    <div className={styles.wrapper}>
      {store.cities.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.title}>It looks like there's nothing here</div>
          <div className={styles.addCity}>
            <AddCity />
          </div>
        </div>
      ) : (
        <ul className={styles.list}>
          {store.cities.map((el: City) => (
            <li key={el.id} className={styles.city}>
              <WeatherCard city={el} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeatherView;
