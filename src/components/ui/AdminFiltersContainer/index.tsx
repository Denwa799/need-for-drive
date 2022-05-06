import React, { FC } from 'react';
import { Row } from 'antd';
import styles from './styles.module.less';

export const AdminFiltersContainer: FC = ({ children }) => {
  return <Row className={styles.AdminFiltersContainer}>{children}</Row>;
};
