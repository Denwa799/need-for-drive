import React, { FC } from 'react';
import cn from 'classnames';
import { IAppModal } from './type';
import styles from './styles.module.less';

export const AppModal: FC<IAppModal> = ({ children, active }) => {
  return (
    <div className={cn(styles.AppModal, { [styles.active]: active })}>
      <div className={cn(styles.modalContent, { [styles.active]: active })}>{children}</div>
    </div>
  );
};
