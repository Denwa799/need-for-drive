import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './styles.module.less';

const { Title } = Typography;

export const AdminTitle: FC = ({ children }) => {
  return (
    <div className={styles.AdminTitle}>
      <Title level={3} className={styles.title}>
        {children}
      </Title>
      ;
    </div>
  );
};
