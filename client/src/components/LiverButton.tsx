import React, { useState } from 'react'
import { ILiver } from '../contexts/LiversContext'
//FIXME proper avatar sources, add pin, add square/round avatars
export const LiverButton = ({ liver: { name, color }, filter, setFilter }: {
  liver: ILiver,
  filter: { livers: Set<string> },
  setFilter: (filter: { livers: Set<string> }) => void
}) => {
  const isActive = filter.livers.has(name)

  return (
    <div className={"liver-info " + (isActive ? 'checked' : '')}
      title={name}
      style={{ '--theme-color': color } as React.CSSProperties}
      onClick={() => {
        const livers = new Set(filter.livers)
        if (isActive) {
          livers.delete(name)
        }
        else {
          livers.add(name)
        }
        console.log(livers);
        
        setFilter({ ...filter, livers })
      }}
    >
      <div className="avatar">
        <img src={`https://cdn.wikiwiki.jp/to/w/nijisanji/${name}/::ref/face.png`} alt={name} />
      </div>
      <span className="name">{name}</span>
    </div>
  )
}
