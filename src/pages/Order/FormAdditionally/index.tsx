import React, { FC, useCallback, useState } from 'react';
import { DatePicker, Input, Radio, Typography } from 'antd';
import cn from 'classnames';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment, { Moment } from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';

const { Text } = Typography;

export const FormAdditionally: FC = () => {
  const [color, setColor] = useState('Любой');
  const [startDate, setStartDate] = useState<Moment>();
  const [endDate, setEndDate] = useState<Moment>();

  // Обработчик нажатия на radio button
  const colorChangeHandler = useCallback(
    (event: RadioChangeEvent) => {
      setColor(event.target.value);
    },
    [color]
  );

  // Отключаю даты, что уже прошли
  const disabledStartDate = (current: Moment) => {
    return current < moment();
  };

  // Отключаю даты, меньше стартовой даты
  const disabledEndDate = (current: Moment) => {
    return current < moment(startDate);
  };

  // Обработчики нажатия на даты
  const startDateChangeHandler = (date: Moment | null) => {
    setStartDate(date!);
  };

  const endDateChangeHandler = (date: Moment | null) => {
    setEndDate(date!);
  };

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
    </div>
  );
};
