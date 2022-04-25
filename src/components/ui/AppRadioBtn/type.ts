import React from 'react';

export interface IAppRadioBtn {
  value: string;
  filterValue: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}
