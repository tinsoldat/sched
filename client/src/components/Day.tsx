import React from 'react'
import { isSameDay } from 'date-fns'
import { useAppSelector } from '../app/hooks'
import { selectByDateAndFilter } from '../features/events/eventsSlice'
import { Event } from './Event'

interface DayProps {
  date: Date,
}

export const Day = ({ date }: DayProps) => {
  const events = useAppSelector(state => selectByDateAndFilter(state, date));

  const now = new Date();
  const timePointer = isSameDay(now, date)
    ? <div className="time-pointer" style={{ top: (now.getHours() * 60 + now.getMinutes()) * 0.0694444 + '%' }} />
    : null;

  return (
    <div className="day">
      <div className="events">
        {events.map(event => <Event key={event._id} event={event} />)}
      </div>
      {timePointer}
    </div>
  )
}
