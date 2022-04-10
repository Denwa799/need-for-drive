import React, { FC, useCallback } from 'react';
import { Checkbox, Col, DatePicker, Radio, Row, Typography } from 'antd';
import cn from 'classnames';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment, { Moment } from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { IFormAdditionally } from './type';

const { Text } = Typography;

export const FormAdditionally: FC<IFormAdditionally> = ({
  color,
  setColor,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rate,
  setRate,
  isFullTank,
  setIsFullTank,
  isChildSeat,
  setIsChildSeat,
  isRightHandDrive,
  setIsRightHandDrive,
}) => {
  // Обработчик нажатия на color radio button
  const colorChangeHandler = useCallback(
    (event: RadioChangeEvent) => {
      setColor(event.target.value);
    },
    [color]
  );

  // Отключаю даты, что уже прошли
  const disabledStartDate = useCallback((current: Moment) => {
    return current < moment();
  }, []);

  // Отключаю даты, меньше стартовой даты. Для второго поля, до какой даты аренда
  const disabledEndDate = useCallback(
    (current: Moment) => {
      return current < moment(startDate);
    },
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

  const endDateChangeHandler = useCallback(
    (date: Moment | null) => {
      return setEndDate(date!);
    },
    [endDate]
  );

  // Обработчик нажатия на rate radio button
  const rateChangeHandler = useCallback(
    (event: RadioChangeEvent) => {
      setRate(event.target.value);
    },
    [rate]
  );

  // Обработчики нажатия на checkbox
  const fullTankChangeHandler = useCallback(() => {
    setIsFullTank(!isFullTank);
  }, [isFullTank]);

  const childSeatChangeHandler = useCallback(() => {
    setIsChildSeat(!isChildSeat);
  }, [isChildSeat]);

  const rightHandDriveChangeHandler = useCallback(() => {
    setIsRightHandDrive(!isRightHandDrive);
  }, [isRightHandDrive]);

  return (
    <div className={styles.FormAdditionally}>
      <div className={styles.colorsBlock}>
        <Text className={styles.text__light}>Цвет</Text>
        <div className={styles.colorsContainer}>
          <Radio.Group onChange={colorChangeHandler} value={color} className={styles.RadioGroup}>
            <Radio
              value="Любой"
              className={cn(styles.Radio, { [styles.RadioActive]: color === 'Любой' })}
            >
              Любой
            </Radio>
            <Radio
              value="Красный"
              className={cn(styles.Radio, { [styles.RadioActive]: color === 'Красный' })}
            >
              Красный
            </Radio>
            <Radio
              value="Голубой"
              className={cn(styles.Radio, { [styles.RadioActive]: color === 'Голубой' })}
            >
              Голубой
            </Radio>
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
          <Radio.Group onChange={rateChangeHandler} value={rate} className={styles.RadioGroup}>
            <Radio
              value="Поминутно"
              className={cn(styles.Radio, styles.rate, {
                [styles.RadioActive]: rate === 'Поминутно',
              })}
            >
              Поминутно, 7₽/мин
            </Radio>
            <Radio
              value="На сутки"
              className={cn(styles.Radio, styles.rate, {
                [styles.RadioActive]: rate === 'На сутки',
              })}
            >
              На сутки, 1999₽/сутки
            </Radio>
          </Radio.Group>
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
  );
};
