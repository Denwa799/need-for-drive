import React, { FC } from 'react';
import styles from './AppContainer.module.less';

const AppContainer: FC = ({ children }) => {
  return <div className={styles.AppContainer}>{children}</div>;
};

export default AppContainer;
