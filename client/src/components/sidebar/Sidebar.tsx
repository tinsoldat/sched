import React, { useState } from "react";
import { Navbar, NavbarVoid } from "./Navbar";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import { ReactComponent as ListIcon } from "../../assets/list.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import "./Sidebar.scss";
import { SidebarMenu } from "./SidebarMenu";

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(-1);
  return (
    <div className="sidebar">
      <SidebarMenu activeTab={activeTab}>1</SidebarMenu>
      <Navbar activeTab={activeTab} setActive={setActiveTab}>
        <FilterIcon />
        {/* <NavbarItem><NavbarFilter /></NavbarItem> */}
        <ListIcon />
        <NavbarVoid />
        <SettingsIcon />
      </Navbar>
    </div>
  );
};
