import React from 'react';

export interface IAdminSidebarMobile {
  adminSidebarItems: {
    key: number;
    children: string;
    value: string;
    icon: React.ReactNode;
  }[];
}
