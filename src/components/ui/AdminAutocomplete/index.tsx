import React, { FC } from 'react';
import cn from 'classnames';
import { AutoComplete, Input, Spin } from 'antd';
import { CaretDownFilled, CaretUpFilled, LoadingOutlined } from '@ant-design/icons/lib';
import styles from './styles.module.less';
import { IAdminAutocomplete } from './type';

export const AdminAutocomplete: FC<IAdminAutocomplete> = ({
  options,
  filterOption,
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  isLoading,
}) => {
  return (
    <div className={styles.AdminAutocomplete}>
      <AutoComplete
        className={cn(styles.autocomplete, className)}
        options={options}
        filterOption={filterOption}
        value={value}
        onChange={onChange}
        notFoundContent={
          isLoading ? (
            <Spin className={styles.loader} indicator={<LoadingOutlined />} size="large" />
          ) : (
            'Не найдено'
          )
        }
      >
        <Input className={cn(styles.input, inputClassName)} placeholder={placeholder} />
      </AutoComplete>
      <div className={styles.filterIcn}>
        <CaretUpFilled />
        <CaretDownFilled />
      </div>
    </div>
  );
};
