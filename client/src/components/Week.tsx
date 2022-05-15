import React, { useMemo } from 'react'
import { Day } from './Day'
import '../styles/Week.sass'
import { IEvent } from '../contexts/EventsContext'

interface WeekProps {
  events: IEvent[],
  filter: { livers: Set<string> }
}

export const Week = ({ events, filter }: WeekProps) => {

  const groupedEvents = useMemo(() => {
    const now = new Date()
    now.setDate(now.getDate() - now.getDay() - 10)
    return events.reduce((acc, val) => {
        
      const day = val.date.getDate() - now.getDate()
      if (day > 0 && day < 7) {
        if (!acc[day]) acc[day] = []
        acc[day].push(val)
      }
  
      return acc
    }, new Array<IEvent[]>(7))
  }, [events])
  

  

  return (
    <div className="week">
      <div className="week-inner">
        <div className="header">
          <div className="day-names">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
              (val) => <div className="day-name-container" key={val}>
                <span className="day-name">{val}</span>
                <div className="day-separator"></div>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <div className="hours-container">
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,].map(
              (val, i) => <div className="hour-container" key={i}>
                <div className="hour" >{('0' + i).slice(-2) + ':00'}</div>
              </div>
            )}
          </div>
          <div className="days-container">
            <div className="hour-separators-container">
              {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,].map(
                (val, i) => <div className="hour-separator" key={i}></div>
              )}
            </div>
            <div className="gutter" />
            <div className="days">
              {groupedEvents.map(
                (val, i) => <Day key={i} day={i} events={val} filter={filter} />
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}