import React, { FC, useState } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import styles from './FormModel.module.less';

const FormModel: FC = () => {
  const [value, setValue] = useState('all');

  const onChangeHandler = (e: any) => {
    // Стоит any, так как сюда приходит событие и value из компоненты radio библиотеки ant design
    setValue(e.target.value);
  };

  return (
    <div className={styles.FormModel}>
      <Radio.Group onChange={onChangeHandler} value={value} className={styles.RadioGroup}>
        <Radio value="all" className={cn(styles.Radio, { [styles.RadioActive]: value === 'all' })}>
          Все модели
        </Radio>
        <Radio
          value="econom"
          className={cn(styles.Radio, { [styles.RadioActive]: value === 'econom' })}
        >
          Эконом
        </Radio>
        <Radio
          value="prem"
          className={cn(styles.Radio, { [styles.RadioActive]: value === 'prem' })}
        >
          Премиум
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default FormModel;
