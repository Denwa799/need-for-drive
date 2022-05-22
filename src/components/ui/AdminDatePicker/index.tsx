import React, { FC } from 'react';
import cn from 'classnames';
import { DatePicker } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { IAdminDatePicker } from './type';

export const AdminDatePicker: FC<IAdminDatePicker> = ({
  placeholder,
  className,
  disabledDate,
  defaultValue,
  value,
  onChange,
  isDanger,
}) => {
  return (
    <DatePicker
      format="DD.MM.YYYY HH:mm"
      className={cn(styles.AdminDatePicker, { [styles.danger]: isDanger }, className)}
      showTime
      showNow={false}
      placeholder={placeholder}
      disabledDate={disabledDate}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      status={isDanger ? 'error' : undefined}
      clearIcon={<CloseOutlined style={{ color: '#000', fontSize: 14 }} />}
      suffixIcon
      placement="bottomRight"
    />
  );
};
