import React from "react";
import { Filter } from "../../features/filter/components/Filter";
import "./SidebarMenu.scss";

interface SidebarMenuProps {
  activeTab: number;
  children: React.ReactNode;
}
export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeTab,
  children,
}) => {
  if (activeTab < 0) return null;
  if (activeTab === 0) return <div className="sidebar-menu bg-main"><Filter /></div>
  return <div className="sidebar-menu bg-main">{children}</div>;
};
