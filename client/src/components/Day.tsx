import React from 'react'
import { EventsContext } from '../contexts/EventsContext'
import { Event } from './Event'

export const Day = ({ day }: { day: number }) => {
  return (
    <div className="day">
      <EventsContext.Consumer>
        {value => {
          return <div className="events">
            <div className="event-card">
              {value?.[day].map((value, i) => {
                return <Event key={i} event={value} />
                // return <div>{value.feat[0][0]}</div>
              })}
            </div>
          </div>
        }}
      </EventsContext.Consumer>
    </div>
  )
}