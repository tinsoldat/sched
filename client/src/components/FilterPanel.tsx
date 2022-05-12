import React, { useContext, useMemo } from 'react'
import '../styles/FilterPanel.sass'
import { ILiver, LiversContext } from '../contexts/LiversContext'
import { LiverButton } from './LiverButton'

interface FilterPanelProps {
  toggle: (name: string) => boolean,
  filterOptions: Set<string>,
  tab: string
}
//TODO close on click outside, filter by group, pin groups
export const FilterPanel = ({ toggle, filterOptions, tab }: FilterPanelProps) => {
  const livers = useContext(LiversContext)

  const groupedLivers = useMemo(() => Object.entries(
    livers.reduce((acc, val) => {
      if (!acc[val.units[0]]) acc[val.units[0]] = [val]
      else acc[val.units[0]].push(val)
      return acc
    }, {} as { [type: string]: ILiver[] })
  ), [livers])

  return (
    <div className="filter">
      {groupedLivers.map(([unitName, members]) => <>
        <h3 className='secondary'>{unitName.replace(/^_.+/, members.map(({ name }: ILiver) => name).join('、'))}</h3>
        <div className="livers-group" key={unitName} data-group={unitName}>
          {members.map(({ name, avatar, color }: ILiver) => <LiverButton name={name}
            avatar={avatar}
            color={color}
            toggle={toggle}
            isActive={filterOptions.has(name)}
            key={name}
          />)}
        </div>
      </>)}
    </div>
  )
}