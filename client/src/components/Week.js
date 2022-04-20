import { useContext } from "react"
import { Context } from "../contexts/Context"
import { Day } from "./Day";
import { Hours } from "./Hours";

export const Week = (props) => {
  const { date, first } = props
  const context = useContext(Context)

  const weekStart = new Date(date)
  let weekDiff = 0
  if (first === 'monday') {
    weekDiff = 1
    if (date.getDay() === 0) weekDiff = -6
  }
  weekStart.setDate(weekStart.getDate() - date.getDay() + weekDiff)
  
  const days = []
  for (let index = 0; index < 7; index++) {
    const day = new Date()
    day.setDate(weekStart.getDate() + index)
    const events = context.events.filter((event) => event.date.getDate() === day.getDate())
    days.push(<Day events={events} date={day} key={day.getDate()}></Day>)
  }

  return (
    <div className="week">
      {/* <Header></Header> */}
      <Hours></Hours>
      <div className="columns">
        {days}
      </div>
    </div>
  )
}