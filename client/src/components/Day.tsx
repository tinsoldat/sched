import React from 'react'
import { IEvent } from '../contexts/EventsContext'
import { Event } from './Event'

interface DayProps {
  date: number,
  events: IEvent[],
  filter: { livers: Set<string> }
}

export const Day = ({ date, events, filter }: DayProps) => {
  const now = new Date()

  const today = events.filter(val => {
    const isToday = val.date.getDate() === date
    const isFiltered = !Object.keys(val.feat).every(name => !filter.livers.has(name))
    return isFiltered && isToday
  }).sort((e1, e2) => e1.date.valueOf() - e2.date.valueOf()) as (IEvent & { pos: { col: number, cols: number } })[]

  const isIntersecting = (d1: Date, d2: Date) => {
    const ms = Math.abs(d1.valueOf() - d2.valueOf())
    const min = Math.ceil(ms / (60 * 1000) / 15) * 15

    return min < 48
  }

  const computeLayout = () => {
    for (let i = 0; i < today.length - 1; i++) {
      const cur = today[i];
      const prev = today[i - 1]
      const next = today[i + 1]
      cur.pos = { col: 1, cols: 1 }
      const group = []
      if (isIntersecting(cur.date, next.date)) {
        for (let j = i - 1; j > 0; j--) {
          const old = today[j];
          if (isIntersecting(old.date, cur.date)) {
            group.push(old)
          } else {
            break
          }
        }
        group.forEach(val => val.pos.cols = group.length)
      }

    }
  }

  computeLayout()


  return (
    <div className="day">
      <div className="events">
        {today.map((val, i) => <Event event={val} />)}
      </div>
      {now.getDate() === date ? <div className="time-pointer" style={{ top: (now.getHours() * 60 + now.getMinutes()) * 0.0694444 + '%' }} /> : ''}
    </div>
  )
}
