import React from 'react'
import { ILiver } from '../contexts/LiversContext'
//FIXME proper avatar sources, add pin, add square/round avatars
export const LiverButton = ({
  name,
  avatar,
  color,
  toggle,
  isActive
}: Omit<ILiver, 'units' | 'urls'> & { toggle: any, isActive: boolean }) => {

  return (
    <div className={"liver-info " + (isActive ? 'checked' : '')}
      title={name}
      style={{ '--theme-color': color + '88' } as React.CSSProperties}
      onClick={() => { toggle(name) }}
    >
      <div className="avatar">
        <img src={`https://cdn.wikiwiki.jp/to/w/nijisanji/${name}/::ref/face.png`} alt={name} />
      </div>
      <span className="name">{name}</span>
    </div>
  )
}
