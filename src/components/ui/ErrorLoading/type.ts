import React from 'react';

export interface IErrorLoading {
  loading: boolean;
  error: null | string;
  content?: React.ReactNode;
  type?: string;
}
