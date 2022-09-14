import React, { useEffect, useRef } from 'react';
import { City } from '@/interfaces';
import styles from './WeatherCard.module.scss';
import {
  DashboardOutlined as IconPressure,
  SendOutlined as IconArrow,
} from '@ant-design/icons';

interface WeatherCatdProps {
  city: City;
}

const WeatherCatd: React.FC<WeatherCatdProps> = ({ city }) => {
  const arrowIconRef = useRef<HTMLSpanElement | null>(null);

  const imgUrl = `${import.meta.env.VITE_IMAGE_URL}/${city.icon}@2x.png`;
  const windIconStyle = `transform: rotate(${city.wind.deg + 180}deg)`;

  useEffect(() => {
    if (arrowIconRef.current) {
      arrowIconRef.current
        .querySelector('svg')!
        .setAttribute('style', windIconStyle);
    }
  }, [arrowIconRef.current]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {city.name}, {city.country}
      </div>
      <div className={styles.weather}>
        <img src={imgUrl} alt="weather icon" />
        <div className={styles.deg}>
          <strong>{city.temperature}&deg;C</strong>
        </div>
      </div>

      <div className={styles.description}>
        Feels like {city.feelsLike}&deg;C.
        <span className={styles.descriptionWeather}>
          {city.weatherDescription}. {city.wind.description}
        </span>
      </div>

      <div className={styles.params}>
        <p>
          <span className={styles.arrowIcon}>
            <IconArrow ref={arrowIconRef} />
          </span>
          {city.wind.speed} m/s {city.wind.direction}
        </p>
        <p>
          <IconPressure />
          {city.pressure} hPa
        </p>
        <p>Humidity: {city.humidity}</p>
        <p>Dew point: {city.dewPoint}</p>
        <p>Visibility: {city.visibility} km</p>
      </div>
    </div>
  );
};

export default WeatherCatd;
