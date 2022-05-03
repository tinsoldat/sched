import React from 'react'
import '../styles/Navbar.sass'

export const Navbar = () => {

  return (
    <div className="navbar">
      <div className="navbar__header">
        <div className="filter">
          <div className="filter__icon icon"></div>
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
  )
}