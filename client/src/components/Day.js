import { Event } from "./Event"

export const Day = (props) => {
  console.log(props);
  
  const events = props.events ?? []
  console.log(events);

  return (
    <div className="day">
      {/* <h3 className="temp">{date.toDateString()}</h3> */}
      {events.map(event => {
        return <Event key={event.date.getTime()} event={event}></Event>
      })}
    </div>
  )
}