import React, { useContext, useMemo } from 'react'
import '../styles/FilterPanel.sass'
import { ILiver, LiversContext } from '../contexts/LiversContext'
import { Liver } from './Liver'

interface Filter {
  filter: {
    livers: Set<string>
  },
  setFilter: (filter: { livers: Set<string> }) => void
}

//TODO pin groups
export const Filter = ({ filter, setFilter }: Filter) => {
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

const Unit = ({ value: [unitName, members], filter, setFilter }: { value: [string, ILiver[]] } & Filter) => {

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
        {/* FIXME proper unit names to show */}
        {unitName.replace(/^_.+/, members.map(({ name }: ILiver) => name).join('、'))}
      </h3>
      <div className="filter__group" key={unitName} data-group={unitName}>
        {members.map((member: ILiver) => <Button
          key={member.name}
          onClick={() => {
            const livers = new Set(filter.livers)
            if (isActive) {
              livers.delete(member.name)
            }
            else {
              livers.add(member.name)
            }
            console.log(livers);
    
            setFilter({ ...filter, livers })
          }}
          filter={filter}
          setFilter={setFilter}
          liver={member}
        >
          <Liver liver={member} />
        </Button>)}
      </div>
    </div>
  )
}

const Button = ({ children, onClick, liver, filter }: {
  children: React.ReactNode,
  onClick: React.EventHandler<React.MouseEvent>,
  liver: ILiver,
  filter: { livers: Set<string> },
  setFilter: (filter: { livers: Set<string> }) => void
}) => {
  const isActive = filter.livers.has(liver.name)

  return (
    <div className={'filter__btn btn' + (isActive ? ' checked' : '')}
      title={liver.name}
      style={{ '--theme-color': liver.color } as React.CSSProperties}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
