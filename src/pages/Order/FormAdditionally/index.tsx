import React, { FC, useCallback, useState } from 'react';
import { DatePicker, Radio, Typography } from 'antd';
import cn from 'classnames';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment from 'moment';
import styles from './styles.module.less';

const { Text } = Typography;

export const FormAdditionally: FC = () => {
  const [color, setColor] = useState('Любой');

  // Обработчик нажатия на radio button
  const colorChangeHandler = useCallback(
    (event: RadioChangeEvent) => {
      setColor(event.target.value);
    },
    [color]
  );

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
            />
          </div>
          <div className={styles.dateContainer}>
            <Text className={cn(styles.text__light, styles.dateText)}>По</Text>
            <DatePicker
              format="DD.MM.YYYY HH:mm"
              showTime
              showNow={false}
              className={styles.datePicker}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
