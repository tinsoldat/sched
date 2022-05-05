import React from 'react'
import { Event as Model } from '../contexts/EventsContext'
import '../styles/Event.sass'
import avatar from '../images/avatar.png'

export const Event = ({ event }: { event: Model }) => {
  let { date, feat, description, note } = event
  date = new Date(date)
  const hours = date.getHours(), minutes = date.getMinutes()
  const top = (((hours + 3) % 24 * 60 + minutes) / 1440 * 960) % 960 + 'px'
  const time = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
  return (
    <div className="event" style={{ top }}>
      <div className="main-info">
        <div className="liver-info">
          <div className="avatars-container">
            <img src={avatar} alt="avatar" className='avatar' />
          </div>
        </div>
        <div className="name">{feat[0][0]}</div>
        <div className="time">{time}</div>
      </div>
      <div className="description">
        {description}
      </div>
    </div>
  )
}