import React, { useEffect } from 'react';
import { WeatherHeader } from '@/components';
import { MyCard, MyLoader } from '@/components/UI';
import useWeatherStore from '@/stores/weather/weather';
import SettingsView from '@/views/Settings/Settings';
import WeatherView from '@/views/Weather/Weather';
import styles from './WeatherWidget.module.scss';

interface WeatherWidgetProps {
  timeout?: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ timeout = 30 }) => {
  const store = useWeatherStore();

  useEffect(() => {
    setInterval(async () => {
      store.loadDataForAllCities();
    }, timeout * 60 * 1000);
  }, []);

  const handleClick = () => {
    console.log('click header');
    store.toggleSettings();
    store.resetError();
    store.resetErrorAddCity();
  };

  return (
    <div className={styles.weatherWidget}>
      <MyCard>
        <div className={styles.widgetHeader}>
          <WeatherHeader
            showSettings={store.isSettingsOpen}
            onClick={handleClick}
          />
        </div>
        {store.isSettingsOpen ? <SettingsView /> : <WeatherView />}
        <div className={styles.loaderWrapper}>
          <MyLoader visible={store.isLoading} />
        </div>
      </MyCard>
    </div>
  );
};

export default WeatherWidget;