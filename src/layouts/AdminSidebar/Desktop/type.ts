import React from 'react';

export interface IAdminSidebarDesktop {
  adminSidebarItems: {
    key: number;
    children: string;
    value: string;
    icon: React.ReactNode;
  }[];
}
