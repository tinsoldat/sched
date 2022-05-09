import React, { useState } from 'react'
import '../styles/Navbar.sass'
import { Liver } from '../contexts/LiversContext'
import { FilterPanel } from './FilterPanel'

type NavbarProps = {
  toggle: (name: string) => boolean,
  filterOptions: Set<string>,
  livers: Liver[]
}

export const Navbar = ({ toggle, filterOptions, livers }: NavbarProps) => {
  const [isActive, setIsActive] = useState(false)


  return (
    <>
      <FilterPanel toggle={toggle} filterOptions={filterOptions} livers={livers} isActive={isActive} />
      <div className="navbar">
        <div className="navbar__header">
          <div className="filter">
            <div className="filter__icon icon"
              onClick={() => setIsActive(!isActive)}
            ></div>
            <div className="filter__preview">
              <div className="filter__group">
                <div className="icon"></div>
                <div className="icon"></div>
              </div>
              <div className="filter__group">
                <div className="icon"></div>
                <div className="icon"></div>
                <div className="icon"></div>
              </div>
              <div className="filter__group">
                <div className="icon"></div>
              </div>
            </div>
            <div className="filter-list">
              {/* {livers.map(({ name, urls, avatar }: Liver) => <LiverButton name={name} urls={urls} avatar={avatar} toggle={toggle} key={name} />)} */}
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
    </>
  )
}