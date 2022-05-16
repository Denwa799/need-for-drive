import React, { FC } from 'react';
import cn from 'classnames';
import { Typography } from 'antd';
import styles from './styles.module.less';
import { IAdminTitle } from './type';

const { Title } = Typography;

export const AdminTitle: FC<IAdminTitle> = ({ children, level = 3, className }) => {
  return (
    <div className={styles.AdminTitle}>
      <Title
        level={level}
        className={cn(
          { [styles.title3]: level === 3 },
          { [styles.title4]: level === 4 },
          { [styles.title5]: level === 5 },
          className
        )}
      >
        {children}
      </Title>
    </div>
  );
};
