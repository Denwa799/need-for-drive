import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { AutoComplete, Input, Spin } from 'antd';
import { CaretDownFilled, CaretUpFilled, LoadingOutlined } from '@ant-design/icons/lib';
import styles from './styles.module.less';
import { FilterOptionType, IAdminAutocomplete } from './type';

export const AdminAutocomplete: FC<IAdminAutocomplete> = ({
  options,
  filterOption,
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  isLoading,
  onSelect,
  type,
  danger,
}) => {
  // Фильтрация выводимой подсказки в autocomplete
  const filterOptionDefault = useCallback<FilterOptionType>(
    (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
    []
  );

  return (
    <div className={styles.AdminAutocomplete}>
      <AutoComplete
        className={cn(styles.autocomplete, className)}
        options={options}
        filterOption={filterOption || filterOptionDefault}
        value={value}
        onChange={onChange}
        notFoundContent={
          isLoading ? (
            <Spin className={styles.loader} indicator={<LoadingOutlined />} size="large" />
          ) : (
            'Не найдено'
          )
        }
        onSelect={onSelect}
      >
        <Input
          className={cn(
            styles.input,
            inputClassName,
            { [styles.secondType]: type === 'second' },
            { [styles.danger]: danger }
          )}
          placeholder={placeholder}
          status={danger ? 'error' : undefined}
        />
      </AutoComplete>
      <div className={styles.filterIcn}>
        <CaretUpFilled />
        <CaretDownFilled />
      </div>
    </div>
  );
};
