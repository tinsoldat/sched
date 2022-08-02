import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
  activeTab: number;
  setActive: Function;
}

export const Navbar: React.FC<NavbarProps> = ({ setActive, activeTab, children }) => {
  return (
    <nav className="navbar bg-dark text-light">
      <ul className="navbar__items">
        {React.Children.map(children, (item, index) =>
          (item as React.ReactElement)?.type === NavbarVoid ? (
            <NavbarVoid />
          ) : (
            <NavbarItem key={index} index={index} setActive={setActive} activeTab={activeTab}>{item}</NavbarItem>
          )
        )}
      </ul>
    </nav>
  );
};

interface NavbarItemProps {
  children?: React.ReactNode;
  index: number;
  setActive: Function;
  activeTab: number;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ index, setActive, activeTab, children }) => {
  return <li className="navbar__item" data-active={activeTab === index || null} onClick={() => setActive(index)}>{children}</li>;
};

export const NavbarVoid: React.FC = () => {
  return <li className="navbar__void"></li>;
};
