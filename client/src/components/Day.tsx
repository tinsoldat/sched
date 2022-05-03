import React from 'react'
import { EventsContext } from '../contexts/EventsContext'

export const Day = ({ day } : { day: number }) => {
  return (
    <div className="day">
      <EventsContext.Consumer>
        {value => {
          return <div className="events">
            <div className="event-card">
              {value[day]?.map((value, i) => {
                return <div key={i}>{value.description}</div>
                // return <div key={i}></div>
              })}
            </div>
          </div>
        }}
      </EventsContext.Consumer>
    </div>
  )
}