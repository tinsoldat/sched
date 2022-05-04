import React from 'react'
import { Event } from '../typings'

export const Day = ({ day }: { day: Event[] }) => {
  return (
    <div className="day">
      <div className="event-card">
        {day.map((value, i) => {
          return <div key={i}>{value.description}</div>
        })}
      </div>
    </div>
  )
}