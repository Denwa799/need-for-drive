import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { IAdminBackground } from './type';

export const AdminBackground: FC<IAdminBackground> = ({ children, className }) => {
  return <div className={cn(styles.AdminBackground, className)}>{children}</div>;
};
