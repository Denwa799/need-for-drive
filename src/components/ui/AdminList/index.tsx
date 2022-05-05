import React, { FC } from 'react';
import styles from './styles.module.less';

export const AdminList: FC = ({ children }) => {
  return <div className={styles.AdminList}>{children}</div>;
};
