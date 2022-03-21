import { Input } from 'antd';
import React, { FC } from 'react';
import styles from './FormLocation.module.less';

import map from '../../../../assets/img/map/map.webp';

const FormLocation: FC = () => {
  return (
    <div className={styles.FormLocation}>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <span className={styles.inputText}>Город</span>
          <Input placeholder="Начните вводить город..." className={styles.input} bordered={false} />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputText}>Пункт выдачи</span>
          <Input placeholder="Начните вводить пункт..." className={styles.input} bordered={false} />
        </div>
      </div>
      <div className={styles.mapBlock}>
        <span>Выбрать на карте:</span>
        <img className={styles.map} src={map} alt="map" />
      </div>
    </div>
  );
};

export default FormLocation;
