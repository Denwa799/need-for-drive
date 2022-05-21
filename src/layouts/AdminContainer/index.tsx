import React, { FC } from 'react';
import styles from './styles.module.less';

export const AdminContainer: FC = ({ children }) => {
  return <div className={styles.AdminContainer}>{children}</div>;
};
