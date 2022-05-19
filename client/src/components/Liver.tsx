import React from 'react'
import { ILiver } from '../contexts/LiversContext'
//FIXME proper avatar sources, add pinning to toolbar
export const Liver = ({ liver: { name, color, avatar } }: {
  liver: ILiver,
}) => {

  return (
    <div className="liver">
      <div className="liver__avatar">
        <img src={`https://cdn.wikiwiki.jp/to/w/nijisanji/${name}/::ref/face.png`} alt={name} />
      </div>
      <span className="liver__name">{name}</span>
    </div>
  )
}

