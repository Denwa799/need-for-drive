import React from 'react';

export interface IErrorLoading {
  loading: boolean;
  error: null | string;
  isLarge?: boolean;
  errorClassName?: string;
  content?: React.ReactNode;
  type?: string;
}
