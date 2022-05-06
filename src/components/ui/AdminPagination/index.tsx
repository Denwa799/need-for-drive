import React, { FC } from 'react';
import styles from './styles.module.less';
import { AppPagination } from '../AppPagination';
import { IAdminPagination } from './type';

export const AdminPagination: FC<IAdminPagination> = ({
  total,
  onChange,
  pageSizeOptions,
  page,
  sizeChangerInvisibleWidth,
}) => {
  return (
    <div className={styles.AdminPagination}>
      <AppPagination
        total={total}
        onChange={onChange}
        pageSizeOptions={pageSizeOptions}
        page={page}
        type="blue"
        sizeChangerInvisibleWidth={sizeChangerInvisibleWidth}
      />
    </div>
  );
};
