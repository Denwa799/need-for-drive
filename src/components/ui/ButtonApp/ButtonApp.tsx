import { Button } from 'antd';
import React, { FC } from 'react';
import cn from 'classnames';
import styles from './ButtonApp.module.less';
import { IButtonApp } from './type';

const ButtonApp: FC<IButtonApp> = ({
  children,
  background,
  disabled,
  onClick,
  type = 'primary',
  className,
}) => {
  return (
    <Button
      type="primary"
      className={cn(
        styles.ButtonApp,
        className,
        { [styles.ButtonApp__primary]: type === 'primary' },
        { [styles.ButtonApp__darkGreen]: type === 'darkGreen' },
        { [styles.ButtonApp__blue]: type === 'blue' },
        { [styles.ButtonApp__red]: type === 'red' },
        { [styles.ButtonApp__purple]: type === 'purple' }
      )}
      size="large"
      style={{ background: `${background}` }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonApp;
