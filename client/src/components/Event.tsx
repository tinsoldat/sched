import React from 'react'
import { Event as Model } from '../contexts/EventsContext'
import '../styles/Event.sass'
import avatar from '../images/avatar.png'

export const Event = ({ event }: { event: Model }) => {
  let { date, feat, description, note } = event
  date = new Date(date)
  const hours = date.getHours(), minutes = date.getMinutes()
  let minSinceMidnight = hours * 60 + minutes
  if (minSinceMidnight > 1380) minSinceMidnight -= minSinceMidnight % 1380
  //steps of 15 minutes, no 23hr+
  const top = Math.floor((minSinceMidnight) / 15) / 0.96 + '%'
  const time = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
  return (
    <div className="event" style={{ top }}>
      <div className="main-info">
        <div className="liver-info">
          <div className="avatars-container">
            <img src={avatar} alt="avatar" className='avatar' />
          </div>
          <div className="name">{Object.keys(feat)}</div>
        </div>
        <div className="time">{time}</div>
      </div>
      <div className="description">
        {description}
      </div>
    </div>
  )
}