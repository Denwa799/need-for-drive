import React, { FC } from 'react';
import cn from 'classnames';
import { InputNumber } from 'antd';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons/lib';
import styles from './styles.module.less';
import { IAdminInputNumber } from './type';

export const AdminInputNumber: FC<IAdminInputNumber> = ({
  min,
  max,
  className,
  bordered = false,
  value,
  onChange,
  danger,
}) => {
  return (
    <div className={styles.AdminInputNumber}>
      <InputNumber
        min={min}
        max={max}
        className={cn(styles.inputNumber, className, { [styles.danger]: danger })}
        bordered={bordered}
        controls={{
          upIcon: <CaretUpFilled />,
          downIcon: <CaretDownFilled />,
        }}
        value={value}
        onChange={onChange}
        status={danger ? 'error' : undefined}
      />
    </div>
  );
};
