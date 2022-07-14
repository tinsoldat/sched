import React, { useContext, useMemo } from "react"
import { LiversContext, ILiver } from "../../../contexts/LiversContext"
import { Unit } from "./FilterUnit"
import './Filter.scss'

export const Filter = React.memo(() => {
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
      {groupedLivers.map(([unit, members]) => <Unit key={unit} unit={unit} members={members} />)}
    </div>
  )
})