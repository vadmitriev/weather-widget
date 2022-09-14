import React from 'react';
import { City } from '../../interfaces';
import styles from './Settings.module.scss';
import { ReactSortable } from 'react-sortablejs';
import {
  MenuOutlined as IconMenu,
  DeleteOutlined as IconDelete,
} from '@ant-design/icons';
import { MyButton } from '../../components/UI';
import { AddCity } from '../../components';
import useWeatherStore from '../../stores/weather/weather';

interface SettingsViewProps {}

const SettingsView: React.FC<SettingsViewProps> = () => {
  const store = useWeatherStore();

  const handleSetList = (values: City[]) => {
    store.setCities(values);
  };

  const handleClick = (city: City) => {
    store.removeCity(city);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Settings</div>

      <ReactSortable
        list={store.cities}
        setList={handleSetList}
        tag="ul"
        className={styles.list}
      >
        {store.cities.map((el: City) => (
          <li className={styles.item} key={el.id}>
            <div className={styles.left}>
              <div className={styles.left}>
                <IconMenu />
              </div>
              <span className={styles.name}>{el.name}</span>
            </div>

            <MyButton size="s" onClick={() => handleClick(el)}>
              <IconDelete />
            </MyButton>
          </li>
        ))}
      </ReactSortable>

      <div className={styles.addCity}>
        <span className={styles.title}>Add Location</span>
        <AddCity />
      </div>
    </div>
  );
};

export default SettingsView;
