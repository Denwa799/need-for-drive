import { AutoComplete, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styles from './FormLocation.module.less';
import map from '../../../../assets/img/map/map.webp';
import { useActionsMapPoints } from '../../../../hooks/useActions/useActionsMapPoints';
import { useTypedSelector } from '../../../../hooks/useTypesSelector';
import { mapPointsSelector } from '../../../../store/selectors/selectors';

interface IFormLocation {
  optionsCity: {
    value: string;
  }[];
  optionsName: {
    value: string;
  }[];
  cityValue: string;
  setCityValue: (value: string) => void;
  pointValue: string;
  setPointValue: (value: string) => void;
}

const FormLocation: FC<IFormLocation> = ({
  optionsCity,
  optionsName,
  cityValue,
  setCityValue,
  pointValue,
  setPointValue,
}) => {
  const cityValueHandler = (value: string) => {
    setCityValue(value);
  };

  const pointValueHandler = (value: string) => {
    setPointValue(value);
  };

  return (
    <div className={styles.FormLocation}>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <span className={styles.inputText}>Город</span>
          <AutoComplete
            options={optionsCity}
            value={cityValue}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            placeholder="Начните вводить город..."
            allowClear
            onChange={cityValueHandler}
            className={styles.input}
            dropdownClassName={styles.dropdown}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputText}>Пункт выдачи</span>
          <AutoComplete
            options={optionsName}
            value={pointValue}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            placeholder="Начните вводить пункт..."
            allowClear
            onChange={pointValueHandler}
            className={styles.input}
            dropdownClassName={styles.dropdown}
          />
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
