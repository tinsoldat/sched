import React, { useContext, useMemo } from 'react'
import '../styles/FilterPanel.sass'
import { ILiver, LiversContext } from '../contexts/LiversContext'
import { LiverButton } from './LiverButton'

interface FilterPanelProps {
  toggle: (name: string) => boolean,
  filterOptions: Set<string>,
  isActive: boolean
  setIsActive: (isActive: boolean) => void
}
//TODO close on click outside, filter by group, pin groups
export const FilterPanel = ({ toggle, filterOptions, isActive, setIsActive }: FilterPanelProps) => {
  const livers = useContext(LiversContext)

  const groupedLivers = useMemo(() => Object.entries(
    livers.reduce((acc, val) => {
      if (!acc[val.units[0]]) acc[val.units[0]] = [val]
      else acc[val.units[0]].push(val)
      return acc
    }, {} as { [type: string]: ILiver[] })
  ), [livers])

  return (
    <div className={'filter ' + (isActive ? 'visible' : '')}>
      <div className="filter-scrollable-area">
        <div className="filter-options">
          {groupedLivers.map(val => {
            const unit = val[0]
            const liversGroup = val[1]
            return (<div className="livers-group" key={unit} data-group={unit}>
              <h4>{unit.replace(/^_.+/, liversGroup.map(({ name }: ILiver) => name).join('、'))}</h4>
              <div className="livers-group-inner">
                {liversGroup.map(({ name, avatar, color }: ILiver) => {
                  return <LiverButton name={name}
                    avatar={avatar}
                    color={color}
                    toggle={toggle}
                    isActive={filterOptions.has(name)}
                    key={name}
                  />
                })}
              </div>
            </div>)
          })}
        </div>
      </div>
      <div className="filter-padding" onClick={() => setIsActive(!isActive)}></div>
    </div>
  )
}