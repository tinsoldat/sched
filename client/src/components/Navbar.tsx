import React from 'react'
import '../styles/Navbar.scss'
import filterIcon from '../images/filter.svg'
import settingsIcon from '../images/settings.svg'
import { Filter } from '../features/filter/components/Filter'
import Settings from './Settings'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { closeTab, Tabs, toggleTab } from '../features/ui/uiSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const tab = useAppSelector(state => state.ui.tab);

  return (
    <div className="navbar">
      <div className="navbar__slide-menu slide-menu" hidden={tab === Tabs.none}>
        <div className="slide-menu__content">
          <Tab name={Tabs.filter}>
            <Filter />
          </Tab>
          <Tab name={Tabs.options}>
            <Settings />
          </Tab>
        </div>
        <div className="slide-menu__padding" onClick={() => dispatch(closeTab())}></div>
      </div>
      <div className="navbar__toolbar">
        <div className="navbar__header">
          <div className="navbar__filter">
            <div className="navbar__group">
              <Button
                type='navbar'
                onClick={() => dispatch(toggleTab(Tabs.filter))}
                icon={filterIcon}
                isPressed={tab === Tabs.filter} />
            </div>
          </div>
        </div>
        <div className="navbar__footer">
          <div className="navbar__group">
            <Button
              type='navbar'
              onClick={() => dispatch(toggleTab(Tabs.options))}
              icon={settingsIcon}
              isPressed={tab === Tabs.options} />
          </div>
        </div>
      </div>
    </div>)
}

const Button = ({ type, onClick, icon, isPressed }: { type?: string, onClick?: () => void, icon: string, isPressed?: boolean }) => {
  return (
    <button className={type + '__icon-container btn'}
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

const Tab = ({ children, name }: { children: React.ReactNode, name: Tabs }) => {
  const tab = useAppSelector(state => state.ui.tab);
  return <div className="slide-menu__tab" {...{'data-open': tab === name || null}}>
    {children}
  </div>
}

