import React, { FC } from 'react';
import { Row } from 'antd';
import cn from 'classnames';
import styles from './styles.module.less';
import { IAdminFiltersContainer } from './type';

export const AdminFiltersContainer: FC<IAdminFiltersContainer> = ({ children, className }) => {
  return <Row className={cn(styles.AdminFiltersContainer, className)}>{children}</Row>;
};
