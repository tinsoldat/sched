import React, { useMemo } from 'react'
import '../styles/FilterPanel.sass'
import { Liver } from '../contexts/LiversContext'

interface FilterPanelProps {
  toggle: (name: string) => boolean,
  filterOptions: Set<string>,
  livers: Liver[],
  isActive: boolean
}

export const FilterPanel = ({ toggle, filterOptions, livers, isActive }: FilterPanelProps) => {

  const groupedLivers = useMemo(() => {
    return Object.entries(
      livers.reduce((acc, val) => {
        if (!acc[val.units[0]]) acc[val.units[0]] = [val]
        else acc[val.units[0]].push(val)
        return acc
      }, {} as { [type: string]: Liver[] })
    )
  }, [livers])

  console.log(groupedLivers);


  return (
    <div className={'filter-panel ' + (isActive ? 'visible' : '')}>
      <div className="filter-panel-inner">
        <div className="filter-options">
          {
            groupedLivers.map(val => {
              const unit = val[0]
              const livers = val[1]
              return (
                <div className="livers-group" data-group={unit}>
                  <div className="livers-group-inner">
                    {livers.map(({ name, avatar, color }: Liver) => {
                      return <LiverButton name={name}
                        avatar={avatar}
                        color={color}
                        toggle={toggle}
                        isActive={filterOptions.has(name)}
                        key={name}
                      />
                    })}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const LiverButton = ({ name, avatar, toggle, isActive }: Omit<Liver, 'units' | 'urls'> & {
  toggle: any, isActive: boolean
}) => {

  return (
    <div className="liver-name"
      title={name}
      onClick={() => { toggle(name) }}
      style={{ color: isActive ? 'red' : 'gray' }}
    >
      <div className="avatar">
        <img src={`https://cdn.wikiwiki.jp/to/w/nijisanji/${name}/::ref/face.png`} alt={name} />
      </div>
      <span className="name">{name}</span>
    </div>
  )
}
