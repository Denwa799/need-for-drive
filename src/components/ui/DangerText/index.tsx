import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './styles.module.less';

const { Text } = Typography;

export const DangerText: FC = ({ children }) => {
  return (
    <div className={styles.DangerText}>
      <Text type="danger" className={styles.dangerText}>
        {children}
      </Text>
    </div>
  );
};
