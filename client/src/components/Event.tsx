import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { LiversContext } from '../contexts/LiversContext'
import '../styles/Event.sass'
//TODO add support for different density modes

export const Event = ({ event }: { event: IEvent }) => {
  let { date, feat, description } = event
  const hours = date.getHours(), minutes = date.getMinutes()
  let minSinceMidnight = hours * 60 + minutes
  if (minSinceMidnight > 1380) minSinceMidnight -= minSinceMidnight % 1380
  //steps of 15 minutes, no 23hr+
  const top = Math.floor((minSinceMidnight) / 15) / 0.96 + '%'
  const time = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)

  const participants = Object.keys(feat)

  return (
    <LiversContext.Consumer>
      {(livers) => {
        const color = livers.find(val => val.name === participants[0])?.color
        return <div className="event" style={{ '--theme-color': color, top } as React.CSSProperties}>
          <div className="main-info">
            <div className="liver">
              <div className="avatars-container">
                {participants.map(
                  name => <img className='avatar' key={name}
                    src={
                      livers.map(val => val.name).includes(name)
                        ? `https://cdn.wikiwiki.jp/to/w/nijisanji/${name}/::ref/face.png`
                        : ''
                    } alt={name} />
                )}
              </div>
              {participants.length === 1 ? <div className="name">{participants}</div> : ''}
            </div>
            <div className="description">
              {description}
            </div>
            <div className="time">{time}</div>
          </div>
        </div>
      }}
    </LiversContext.Consumer>
  )
}