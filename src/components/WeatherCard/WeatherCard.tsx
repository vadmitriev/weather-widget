import React from 'react';
import { City } from '../../interfaces';
import styles from './WeatherCatd.module.scss';
import {
  DashboardOutlined as IconPressure,
  SendOutlined as IconArrow,
} from '@ant-design/icons';

interface WeatherCatdProps {
  city: City;
}

const WeatherCatd: React.FC<WeatherCatdProps> = ({ city }) => {
  const imgUrl = `${process.env.REACT_APP_IMAGE_URL}/${city.icon}@2x.png`;
  const windIconStyle = { transform: 'rotate(${city.wind.deg + 180}deg);' };

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
            <IconArrow style={windIconStyle} />
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
