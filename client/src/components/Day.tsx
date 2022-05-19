import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { Event } from './Event'

interface DayProps {
  date: number,
  events: IEvent[],
  filter: { livers: Set<string> }
}

export const Day = ({ date, events, filter }: DayProps) => {
  const now = new Date()

  const today = events.filter(val => {
    const isToday = val.date.getDate() === date
    const isFiltered = !Object.keys(val.feat).every(name => !filter.livers.has(name))
    return isFiltered && isToday
  })

  return (
    <div className="day">
      <div className="events">
        {today.map((val, i) =>
          <Event key={i} event={val} />
        )}
      </div>
      {now.getDate() === date ? <div className="time-pointer" style={{ top: (now.getHours() * 60 + now.getMinutes()) * 0.0694444 + '%' }} /> : ''}
    </div>
  )
}