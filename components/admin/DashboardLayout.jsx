"use client";

import { ReactNode } from "react";
import SideBar from './SideBar';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex  flex-col md:flex-row overflow-x-auto">
      <div className="flex-shrink-0">
        <SideBar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
