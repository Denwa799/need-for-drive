import React, { FC } from 'react';
import { AutoComplete, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
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
        <Input
          className={styles.input}
          placeholder={placeholder}
          allowClear={{
            clearIcon: <CloseOutlined style={{ color: '#000', fontSize: 16 }} />,
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default AppAutocomplete;
