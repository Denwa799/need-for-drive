import React, { FC } from 'react';
import cn from 'classnames';
import { Typography } from 'antd';
import styles from './styles.module.less';
import { IAdminText } from './type';

const { Text } = Typography;

export const AdminText: FC<IAdminText> = ({
  children,
  type = 'primary',
  className,
  containerClassName,
}) => {
  return (
    <div className={cn(styles.AdminText, containerClassName)}>
      <Text
        className={cn(
          styles.primary,
          { [styles.subtitle]: type === 'subtitle' },
          { [styles.description]: type === 'description' },
          { [styles.descriptionTitle]: type === 'descriptionTitle' },
          className
        )}
      >
        {children}
      </Text>
    </div>
  );
};
