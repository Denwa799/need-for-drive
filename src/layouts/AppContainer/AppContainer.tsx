import React, { FC } from 'react';
import cn from 'classnames';
import styles from './AppContainer.module.less';
import { IAppContainer } from './type';

const AppContainer: FC<IAppContainer> = ({ children, classNames }) => {
  return <div className={cn(styles.AppContainer, classNames)}>{children}</div>;
};

export default AppContainer;
