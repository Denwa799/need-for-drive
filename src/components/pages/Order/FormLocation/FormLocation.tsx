import { AutoComplete } from 'antd';
import React, { FC } from 'react';
import { AppMap } from './AppMap/AppMap';
import styles from './FormLocation.module.less';
import { IFormLocation } from './type';

const FormLocation: FC<IFormLocation> = ({
  optionsCity,
  optionsName,
  cityValue,
  setCityValue,
  pointValue,
  setPointValue,
  points,
  setActivePointAddress,
  setActivePointCity,
}) => {
  // Устанавливает текст с поля поиска города в стейт
  const cityValueHandler = (value: string) => {
    setCityValue(value);
  };

  // Устанавливает текст с поля поиска пункта выдачи в стейт
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
        <div className={styles.map}>
          <AppMap
            points={points}
            setActivePointAddress={setActivePointAddress}
            setActivePointCity={setActivePointCity}
          />
        </div>
      </div>
    </div>
  );
};

export default FormLocation;
