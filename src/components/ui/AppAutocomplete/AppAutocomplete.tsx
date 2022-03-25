import React, { FC } from 'react';
import { AutoComplete, Input } from 'antd';
import styles from './AppAutocomplete.module.less';
import { IAppAutocomplete } from './type';

const AppAutocomplete: FC<IAppAutocomplete> = ({ options, value, onChange, placeholder }) => {
  return (
    <div className={styles.AppAutocomplete}>
      <AutoComplete
        options={options}
        value={value}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={onChange}
        className={styles.autocomplete}
        dropdownClassName={styles.dropdown}
      >
        <Input className={styles.input} placeholder={placeholder} allowClear />
      </AutoComplete>
    </div>
  );
};

export default AppAutocomplete;
