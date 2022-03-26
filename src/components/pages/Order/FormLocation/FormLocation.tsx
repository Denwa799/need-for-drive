import React, { FC } from 'react';
import AppAutocomplete from '../../../ui/AppAutocomplete/AppAutocomplete';
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
          <div className={styles.autocompleteContainer}>
            <AppAutocomplete
              options={optionsCity}
              value={cityValue}
              onChange={cityValueHandler}
              placeholder="Начните вводить город"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputText}>Пункт выдачи</span>
          <div className={styles.autocompleteContainer}>
            <AppAutocomplete
              options={optionsName}
              value={pointValue}
              onChange={pointValueHandler}
              placeholder="Начните вводить пункт выдачи"
            />
          </div>
        </div>
      </div>
      <div className={styles.mapBlock}>
        <span>Выбрать на карте:</span>
        <div className={styles.map}>
          <AppMap
            points={points}
            setActivePointAddress={setActivePointAddress}
            setActivePointCity={setActivePointCity}
            setCityValue={setCityValue}
            setPointValue={setPointValue}
          />
        </div>
      </div>
    </div>
  );
};

export default FormLocation;
