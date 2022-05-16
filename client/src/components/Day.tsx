import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { Event } from './Event'

export const Day = ({ date, events, filter }: { date: number, events: IEvent[], filter: { livers: Set<string> } }) => {
  const now = new Date()

  return (
    <div className="day">
      <div className="events">
        {events.filter(val => {
          const isFiltered = !Object.keys(val.feat).every(name => !filter.livers.has(name))
          return isFiltered
        })
        .map((val, i) =>
          <Event key={i} event={val} />
        )}
      </div>
      {now.getDate() === date ? <div className="time-pointer" style={{ top: (now.getHours() * 60 + now.getMinutes()) * 0.0694444 + '%' }} /> : ''}
    </div>
  )
}