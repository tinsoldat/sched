import { Event } from "./Event"

export const Day = (props) => {
  
  const events = props.events ?? []
  const date = props.date

  return (
    <div className="day">
      <div className="weekday-label" key={date.getDate()}>
        <span className="weekday">{date.getDate()}</span>
      </div>
      {events.map(event => {
        return <Event key={event.date.getTime()} event={event}></Event>
      })}
    </div>
  )
}