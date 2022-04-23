import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Checkbox, Col, DatePicker, Radio, Row, Typography } from 'antd';
import cn from 'classnames';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment, { Moment } from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import { AppRadioBtn } from 'components/ui/AppRadioBtn';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { IFormAdditionally } from './type';
import styles from './styles.module.less';

const { Text } = Typography;

export const FormAdditionally: FC<IFormAdditionally> = ({
  carColors,
  color,
  setColor,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rate,
  setRate,
  setRatePrice,
  setRateUnit,
  isFullTank,
  setIsFullTank,
  isChildSeat,
  setIsChildSeat,
  isRightHandDrive,
  setIsRightHandDrive,
}) => {
  // Стейт
  const { rates, ratesIsLoading, ratesError } = useTypedSelector(ratesSelector);

  // Запрос на получение списка тарифов из api
  const { fetchRates } = useActions();
  useEffect(() => {
    fetchRates();
  }, []);

  // Отфильтровываю тарифы, где нет описания.
  // Так как считаю, что это ошибка тестового api.
  const filteredRates = useMemo(() => rates.filter((item) => item.rateTypeId), [rates]);

  // Отфильтровываю повторяющиеся цвета
  const filteredColors = useMemo(() => Array.from(new Set(carColors)), [carColors]);

  // Обработчик нажатия на color radio button
  const colorChangeHandler = useCallback(
    (event: RadioChangeEvent) => setColor(event.target.value),
    [color]
  );

  // Отключаю даты, что уже прошли
  const disabledStartDate = useCallback((current: Moment) => current < moment(), []);

  // Отключаю даты, меньше стартовой даты. Для второго поля, до какой даты аренда
  const disabledEndDate = useCallback(
    (current: Moment) => current < moment(startDate),
    [startDate]
  );

  // Обработчики нажатия на даты
  const startDateChangeHandler = useCallback(
    (date: Moment | null) => {
      setEndDate(undefined);
      return setStartDate(date!);
    },
    [startDate]
  );

  const endDateChangeHandler = useCallback((date: Moment | null) => setEndDate(date!), [endDate]);

  // Обработчик нажатия на rate radio button
  const rateChangeHandler = useCallback(
    (value, price, unit) => {
      setRate(value);
      setRatePrice(price);
      setRateUnit(unit);
    },
    [rate]
  );

  // Обработчики нажатия на checkbox
  const fullTankChangeHandler = useCallback(() => setIsFullTank(!isFullTank), [isFullTank]);

  const childSeatChangeHandler = useCallback(() => setIsChildSeat(!isChildSeat), [isChildSeat]);

  const rightHandDriveChangeHandler = useCallback(
    () => setIsRightHandDrive(!isRightHandDrive),
    [isRightHandDrive]
  );

  return (
    <div>
      {ratesIsLoading ? (
        <ErrorLoading loading={ratesIsLoading} error={ratesError} />
      ) : (
        <div className={styles.FormAdditionally}>
          <div className={styles.colorsBlock}>
            <Text className={styles.text__light}>Цвет</Text>
            <div className={styles.colorsContainer}>
              <Radio.Group
                onChange={colorChangeHandler}
                value={color}
                className={cn(styles.RadioGroup, {
                  [styles.RadioFixedWidth]: filteredColors.length >= 4,
                })}
              >
                {filteredColors.map((carColor) => {
                  return (
                    <AppRadioBtn key={carColor} value={carColor} filterValue={color}>
                      {carColor}
                    </AppRadioBtn>
                  );
                })}
              </Radio.Group>
            </div>
          </div>
          <div className={styles.dateBlock}>
            <Text className={styles.text__light}>Дата аренды</Text>
            <div className={styles.dates}>
              <div className={styles.dateContainer}>
                <Text className={cn(styles.text__light, styles.dateText)}>С</Text>
                <DatePicker
                  format="DD.MM.YYYY HH:mm"
                  defaultValue={moment()}
                  showTime
                  showNow={false}
                  className={styles.datePicker}
                  disabledDate={disabledStartDate}
                  value={startDate}
                  onChange={startDateChangeHandler}
                  placeholder="Введите дату и время"
                  clearIcon={<CloseOutlined style={{ color: '#000', fontSize: 14 }} />}
                  suffixIcon
                />
              </div>
              <div className={styles.dateContainer}>
                <Text className={cn(styles.text__light, styles.dateText)}>По</Text>
                <DatePicker
                  format="DD.MM.YYYY HH:mm"
                  showTime
                  showNow={false}
                  className={styles.datePicker}
                  disabledDate={disabledEndDate}
                  value={endDate}
                  onChange={endDateChangeHandler}
                  placeholder="Введите дату и время"
                  clearIcon={<CloseOutlined style={{ color: '#000', fontSize: 14 }} />}
                  suffixIcon
                  disabled={!startDate}
                />
              </div>
            </div>
          </div>
          <div className={styles.ratesBlock}>
            <Text className={styles.text__light}>Тариф</Text>
            <div className={styles.ratesContainer}>
              <div className={styles.RadioGroup}>
                {filteredRates.map((item) => {
                  return (
                    <AppRadioBtn
                      key={item.id}
                      value={item.rateTypeId!.name}
                      filterValue={rate}
                      onClick={(event) =>
                        rateChangeHandler(item.rateTypeId!.name, item.price, item.rateTypeId!.unit)
                      }
                    >
                      {item.rateTypeId!.name}, {item.price}₽/{item.rateTypeId!.unit}
                    </AppRadioBtn>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.servicesBlock}>
            <Text className={styles.text__light}>Доп услуги</Text>
            <div className={styles.servicesContainer}>
              <div className={styles.checkboxGroup}>
                <Row>
                  <Col span={24}>
                    <Checkbox onChange={fullTankChangeHandler} checked={isFullTank}>
                      Полный бак, 500р
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Checkbox onChange={childSeatChangeHandler} checked={isChildSeat}>
                      Детское кресло, 200р
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Checkbox onChange={rightHandDriveChangeHandler} checked={isRightHandDrive}>
                      Правый руль, 1600р
                    </Checkbox>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
