import React, { FC } from 'react';
import { AdminSuccessMsg } from '../AdminSuccessMsg';
import { IAdminSuccessError } from './type';

export const AdminSuccessError: FC<IAdminSuccessError> = ({
  successText,
  isSuccess,
  errorText,
  isError,
}) => {
  return (
    <div>
      {isError && <AdminSuccessMsg type="error">{errorText}</AdminSuccessMsg>}
      {isSuccess && !isError && <AdminSuccessMsg type="success">{successText}</AdminSuccessMsg>}
    </div>
  );
};
