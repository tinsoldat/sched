import React, { useContext, useMemo } from 'react'
import '../styles/FilterPanel.sass'
import { ILiver, LiversContext } from '../contexts/LiversContext'
import { LiverButton } from './LiverButton'

interface FilterPanelProps {
  filter: {
    livers: Set<string>
  },
  setFilter: (filter: { livers: Set<string> }) => void
}

const Unit = ({ value: [unitName, members], filter, setFilter }: { value: [string, ILiver[]] } & FilterPanelProps) => {

  const names = members.map(val => val.name)
  const isActive = !names.every(name => !filter.livers.has(name))

  const clickHandler = () => {
    if (isActive) {
      const livers = new Set(filter.livers)
      names.forEach(name => livers.delete(name))
      setFilter({ ...filter, livers })
    } else {
      setFilter({ ...filter, livers: new Set([...filter.livers, ...names]) })
    }
  }

  return (
    <div className="filter__groups-container" key={unitName}>
      <h3 className={'secondary' + (isActive ? ' active' : '')}
        onClick={clickHandler}
      >
        {unitName.replace(/^_.+/, members.map(({ name }: ILiver) => name).join('、'))}
      </h3>
      <div className="filter__group" key={unitName} data-group={unitName}>
        {members.map((member: ILiver) => <LiverButton
          liver={member}
          filter={filter}
          setFilter={setFilter}
          key={member.name}
        />)}
      </div>
    </div>
  )
}

//TODO pin groups
export const FilterPanel = ({ filter, setFilter }: FilterPanelProps) => {
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
      {groupedLivers.map(val => <Unit key={val[0]} value={val} filter={filter} setFilter={setFilter} />)}
    </div>
  )
}