import React, { useContext, useMemo } from 'react'
import './Filter.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectFilteredByName, toggle } from './filterSlice'
import { ILiver, LiversContext } from '../../contexts/LiversContext'
import { Liver } from '../../components/Liver'

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

interface UnitProps {
  unit: string;
  members: ILiver[];
}

const Unit = ({ unit, members }: UnitProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="filter__groups-container" key={unit}>
      <h3 className='secondary' onClick={() => dispatch(toggle(members.map(member => member.name)))}>
        {unit.replace(/^_.+/, members.map(({ name }: ILiver) => name).join('、'))}
      </h3>
      <div className="filter__group" key={unit} data-group={unit}>
        {members.map((member: ILiver) =>
          <Button key={member.name} liver={member} />)
        }
      </div>
    </div>
  )
}

const Button = ({ liver }: { liver: ILiver }) => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(state => selectFilteredByName(state, liver.name));
  
  return (
    <div className={'filter__btn btn' + (isActive ? ' checked' : '')}
      title={liver.name}
      style={{ '--theme-color': liver.color } as React.CSSProperties}
      onClick={() => dispatch(toggle(liver.name))}
    >
      <Liver liver={liver} />
    </div>
  );
}
