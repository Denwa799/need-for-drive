import AppAutocomplete from 'components/ui/AppAutocomplete/AppAutocomplete';
import React, { FC, useCallback, useEffect } from 'react';
import { AppMap } from './AppMap/AppMap';
import styles from './FormLocation.module.less';
import { IFormLocation } from './type';

const FormLocation: FC<IFormLocation> = ({
  optionsCity,
  optionsName,
  cityValue,
  setCityValue,
  debouncedCityValue,
  pointValue,
  debouncedPointValue,
  setPointValue,
  points,
  setActivePointAddress,
  setActivePointCity,
  clearFormModel,
  clearFormAdditionally,
  setMaxStage,
}) => {
  // Устанавливает текст с поля поиска города в стейт
  const cityValueHandler = useCallback(
    (value: string) => {
      setCityValue(value);
    },
    [cityValue]
  );

  // Устанавливает текст с поля поиска пункта выдачи в стейт
  const pointValueHandler = useCallback(
    (value: string) => {
      setPointValue(value);
    },
    [pointValue]
  );

  useEffect(() => {
    // Очищает текст поля поиска пункта при очистке города
    if (cityValue === '') {
      setPointValue('');
    }
  }, [cityValue]);

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
              disabled={!(points.length > 0)}
            />
          </div>
        </div>
      </div>
      <div className={styles.mapBlock}>
        <span>Выбрать на карте:</span>
        <div className={styles.map}>
          <AppMap
            points={points}
            debouncedCityValue={debouncedCityValue}
            debouncedPointValue={debouncedPointValue}
            setActivePointAddress={setActivePointAddress}
            setActivePointCity={setActivePointCity}
            setCityValue={setCityValue}
            setPointValue={setPointValue}
            clearFormModel={clearFormModel}
            clearFormAdditionally={clearFormAdditionally}
            setMaxStage={setMaxStage}
          />
        </div>
      </div>
    </div>
  );
};

export default FormLocation;
