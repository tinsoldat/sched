import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { ILiver, LiversContext } from '../contexts/LiversContext'
import '../styles/Event.scss'
//TODO add support for different density modes

export const Event = ({ event }: { event: IEvent & { pos: { col: number, cols: number } } }) => {
  let { date, feat, description, pos } = event
  const hours = date.getHours(), minutes = date.getMinutes()
  let minSinceMidnight = hours * 60 + minutes
  if (minSinceMidnight > 1380) minSinceMidnight -= minSinceMidnight % 1380
  //steps of 15 minutes, no 23hr+
  const top = Math.floor((minSinceMidnight) / 15) / 0.96 + '%'
  // const top = minSinceMidnight / 14.40 + '%'
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
          style={{ top, left: ((pos.col - 1) / pos.cols * 100 + '%'), width: 'calc(' + ((1 / pos.cols * 100 + '% - 1px)')) } as React.CSSProperties}
        >
          {pos?.col}/{pos?.cols}
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