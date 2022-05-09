import React, { useState } from 'react'
import '../styles/Navbar.sass'
import { FilterPanel } from './FilterPanel'

type NavbarProps = {
  toggle: (name: string) => boolean,
  filterOptions: Set<string>,
}
//TODO interactions with toolbar
export const Navbar = ({ toggle, filterOptions }: NavbarProps) => {
  const [isActive, setIsActive] = useState(false)

  return (<>
    <FilterPanel
      toggle={toggle}
      filterOptions={filterOptions}
      isActive={isActive}
      setIsActive={setIsActive}
    />
    <div className="navbar">
      <div className="navbar__header">
        <div className="filter-small">
          <div className="filter__icon icon"
            onClick={() => setIsActive(!isActive)}
          ></div>
          <div className="filter__preview">
            <div className="filter-small__group">
              <div className="icon"></div>
              <div className="icon"></div>
            </div>
            <div className="filter-small__group">
              <div className="icon"></div>
              <div className="icon"></div>
              <div className="icon"></div>
            </div>
            <div className="filter-small__group">
              <div className="icon"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar__footer">
        <div className="settings">
          <div className="settings__icon icon"></div>
        </div>
        <div className="about">
          <div className="about__icon icon"></div>
        </div>
      </div>
    </div>
  </>)
}