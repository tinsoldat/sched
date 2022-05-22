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
  }).sort((e1, e2) => e1.date.valueOf() - e2.date.valueOf()) as (IEvent & { pos: { col: number, cols: number, div: number } })[]

  const isIntersecting = (d1: Date, d2: Date) => {
    const ms = Math.abs(d1.valueOf() - d2.valueOf())
    // const min = Math.ceil(ms / (60 * 1000) / 15) * 15
    const min = ms / (60 * 1000)

    return min < 48
  }

  const computeLayout = () => {
    for (let i = 0; i < today.length; i++) {
      const q = i
      const cur = today[i];
      cur.pos = { col: 1, cols: 1, div: 1 }
      let prev
      for (let j = i - 1; j > 0; j--) {
        prev = today[j]
        if (prev && isIntersecting(prev.date, cur.date)) {
          cur.pos = { col: 1, cols: 1, div: (prev.pos.col - 1) / prev.pos.cols }
        } else {
          break
        }
      }
      const group = [cur]
      for (let j = i + 1; j < today.length; j++) {
        const next = today[j]
        if (isIntersecting(cur.date, next.date)) {
          group.push(next)
          i++
        } else {
          break
        }
      }
      if (prev && prev.pos.cols < group.length) cur.pos.div = 1
      group.forEach((val, i) => {
        val.pos = { col: 1, cols: 1, div: cur.pos.div }
        val.pos.cols = group.length
        val.pos.col = i + 1
      })
    }
  }

  computeLayout()


  return (
    <div className="day">
      <div className="events">
        {today.map((val, i) => <Event key={i} event={val} />)}
      </div>
      {now.getDate() === date ? <div className="time-pointer" style={{ top: (now.getHours() * 60 + now.getMinutes()) * 0.0694444 + '%' }} /> : ''}
    </div>
  )
}
