import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { Event } from './Event'

export const Day = ({ day, events, filter }: { day: number, events: IEvent[], filter: { livers: Set<string> } }) => {
  const now = new Date()
  now.setDate(now.getDate() - now.getDay() + day)
  const today = now.getDate()
  return (
    <div className="day">
      <div className="events">
        {events.filter(val => {
          const isToday = val.date.getDate() === today;
          const isFiltered = !Object.keys(val.feat).every(name => !filter.livers.has(name))
          return isToday && isFiltered
        }).map((val, i) =>
          <Event key={i} event={val} />
        )}
      </div>
    </div>
  )
}