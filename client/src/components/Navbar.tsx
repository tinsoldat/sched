import React, { useState } from 'react'
import '../styles/Navbar.scss'
import filterIcon from '../images/filter.svg'
import settingsIcon from '../images/settings.svg'
import { FilterPanel } from './FilterPanel'

type NavbarProps = {
  filter: { livers: Set<string> },
  setFilter: (filter: { livers: Set<string> }) => void
}
//TODO pinning to toolbar
export const Navbar = ({ filter, setFilter }: NavbarProps) => {
  const [tab, setTab] = useState('')

  return (
    <div className="navbar">
      <div className="navbar__slide-menu slide-menu" {...(tab === '' && { hidden: true })}>
        <div className="slide-menu__content">
          <Tab tab={tab} name='filter'>
            <FilterPanel filter={filter} setFilter={setFilter} />
          </Tab>
          <Tab tab={tab} name='settings'>
            <Settings />
          </Tab>
        </div>
        <div className="slide-menu__padding" onClick={() => setTab('')}></div>
      </div>
      <div className="navbar__toolbar">
        <div className="navbar__header">
          <div className="navbar__filter">
            <div className="navbar__group">
              <Button
                type='navbar'
                onClick={() => setTab(tab === 'filter' ? '' : 'filter')}
                icon={filterIcon}
                isPressed={tab === 'filter'} />
            </div>
          </div>
        </div>
        <div className="navbar__footer">
          <div className="navbar__group">
            <Button
              type='navbar'
              onClick={() => setTab(tab === 'settings' ? '' : 'settings')}
              icon={settingsIcon}
              isPressed={tab === 'settings'} />
          </div>
        </div>
      </div>
    </div>)
}

const Button = ({ type, onClick, icon, isPressed }: { type?: string, onClick?: () => void, icon: string, isPressed?: boolean }) => {
  return (
    <button className={type + '__icon-container clickable'}
      onClick={() => onClick && onClick()}
      {...(isPressed && { pressed: '' })}
    >
      <div
        className={(type + '__icon ')}
      >
        <img src={icon} alt="filter" draggable="false" />
      </div>
    </button>
  )
}

const Tab = ({ children, name, tab }: { children: React.ReactNode, name: string, tab: string }) => {
  return <div className="slide-menu__tab"
    {...(tab !== name && { hidden: true })}
  >
    {children}
  </div>
}

const Settings = () => {



  return (
    <div className="settings">
      <div className="settings__item">
        <button className='settings__button clickable'
          onClick={() => {
            fetch('/api/events/update')
          }}>
          Update events
        </button>
      </div>
      <div className="settings__item">
        <button className='settings__button clickable'
          onClick={() => {
            fetch('/api/events/delete')
          }}>
          Clear events
        </button>
      </div>
    </div>
  )
}