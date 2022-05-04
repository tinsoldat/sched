import React from 'react'
import { Day } from './Day'
import '../styles/Week.sass'

export const Week = () => {

  return (
    <div className="week">
      <div className="week__header">
        <div className="gutter"></div>
        {['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday'].map(
          (val, i) => <div key={i} className="weekday">
            <div className="weekday__name-container">
              <div className="weekday__name">
                {val}
              </div>
              <div className="weekday__date">
                {i + 10}
              </div>
            </div>
          </div>
        )}
        <div className="shadow"></div>
      </div>
      <div className="week__content">
        <div className="gutter">
          <div className="hours">
            {
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,].map((val, i) =>
              (<div className="hour" key={i}>
                <div className="hour__separator"></div>
                <div className="time-container">
                  <span className="time">{('0' + i).slice(-2)}:00</span>
                </div>
              </div>)
              )
            }
          </div>
        </div>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
          (val, i) => <Day key={val} day={i} />
        )}
      </div>
    </div>
  )
}