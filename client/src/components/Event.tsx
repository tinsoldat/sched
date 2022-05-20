import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { ILiver, LiversContext } from '../contexts/LiversContext'
import '../styles/Event.scss'
//TODO add support for different density modes

export const Event = ({ event }: { event: IEvent }) => {
  let { date, feat, description } = event
  const hours = date.getHours(), minutes = date.getMinutes()
  let minSinceMidnight = hours * 60 + minutes
  if (minSinceMidnight > 1380) minSinceMidnight -= minSinceMidnight % 1380
  //steps of 15 minutes, no 23hr+
  const top = Math.floor((minSinceMidnight) / 15) / 0.96 + '%'
  const time = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)

  const featNames = Object.keys(feat)
  return (
    <LiversContext.Consumer>
      {(livers) => {
        const participants = featNames.map(name => livers.find(liver => liver.name === name)).filter(liver => liver) as ILiver[]
        const { name, avatar, color } = participants[0]
        let bgCounter = 4

        return <div
          className="event"
          style={{
            top,
            // backgroundImage: 'linear-gradient(#0005, #0005),repeating-linear-gradient(to right,' +
            //   participants.map(({ color }) => {
            //     return color + ' ' + bgCounter + 'px,' + color + ' ' + (bgCounter += 28) + 'px'
            //   }).join(',')
            //   + ')'
          } as React.CSSProperties}
        >
          <div className="event__avatars">
            {participants.map(({ name, avatar, color }) =>
              <div className="event__avatar-container"
                style={{ '--theme-color': color } as React.CSSProperties}
              >
                <img
                  className='event__avatar avatar'
                  key={name}
                  src={`https://cdn.wikiwiki.jp/to/w/nijisanji/${name}/::ref/face.png`}
                  alt={name}
                  draggable="false"
                />
              </div>
            )}
          </div>
          {participants.length === 1
            &&
            <span className="event__name">
              {name}
            </span>
          }
          {description
            &&
            <div className="event__description">
              {description}
            </div>
          }
          <div className="event__time-container">
            <span className="event__time">{time}</span>
          </div>
        </div>
      }}
    </LiversContext.Consumer>
  )
}