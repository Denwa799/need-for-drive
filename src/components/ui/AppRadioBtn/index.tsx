import React, { FC } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import styles from './styles.module.less';
import { IAppRadioBtn } from './type';

export const AppRadioBtn: FC<IAppRadioBtn> = ({
  buttons,
  onChange,
  filterValue,
  allIsActive,
  btnAllText,
}) => {
  return (
    <Radio.Group onChange={onChange} value={filterValue} className={styles.RadioGroup}>
      {allIsActive && (
        <Radio
          value="Все"
          className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Все' })}
        >
          {btnAllText || 'Все'}
        </Radio>
      )}

      {buttons.map((button) => {
        return (
          <Radio
            key={button.id}
            value={button.name}
            className={cn(styles.Radio, { [styles.RadioActive]: filterValue === button.name })}
          >
            {button.name}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};
