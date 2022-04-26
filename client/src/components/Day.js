import { Event } from "./Event"

export const Day = (props) => {

  const events = props.events ?? []
  const date = props.date

  return (
    <div className="day">
      <div className="weekday-label-container" key={date.getDate()}>
        <span className="weekday-label">{date.toDateString()}</span>
        <div className="day-separator"></div>
      </div>
      <div className="events-container">
        {events.map(event => {
          return <Event key={event.date.getTime()} event={event}></Event>
        })}
      </div>
    </div>
  )
}