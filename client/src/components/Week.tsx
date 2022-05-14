import React from 'react'
import { Day } from './Day'
import '../styles/Week.sass'
import { IEvent } from '../contexts/EventsContext'

interface WeekProps {
  events: IEvent[],
  filter: { livers: Set<string> }
}

export const Week = ({ events, filter }: WeekProps) => {

  return (
    <div className="week">
      <div className="week-inner">
        <div className="header">
          <div className="day-names">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
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
              {[0, 0, 0, 0, 0, 0, 0,].map(
                (val, i) => <Day key={i} day={i} events={events} filter={filter} />
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}