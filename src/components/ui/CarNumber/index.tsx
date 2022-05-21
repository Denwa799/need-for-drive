import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { ICarNumber } from './type';

export const CarNumber: FC<ICarNumber> = ({ number, className, containerClassName }) => {
  const regCarNumber = useMemo(() => {
    // В регулярном выражении ищутся все цифры от 1 символа и более, и затем перед и после них ставится пробел
    const reg = /\d{1,}/g;
    return number.replace(reg, ` $& `);
  }, [number]);

  return (
    <div className={cn(styles.CarNumber, containerClassName)}>
      <span className={cn(styles.number, className)}>{regCarNumber}</span>
    </div>
  );
};
