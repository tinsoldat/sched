import React from "react";
import { Day } from "./Day";

export const Week = (props) => {
  const { date, first } = props

  const weekStart = new Date(date)
  weekStart.setDate(weekStart.getDate() - date.getDay())
  let weekDiff = 0
  if (first === 'monday') {
    weekDiff = 1
    if (date.getDay() === 0) weekDiff = -6
  }

  const days = []
  for (let index = 0; index < 7; index++) {
    const day = new Date()
    day.setDate(weekStart.getDate() + index + weekDiff)
    days.push(<Day date={day} key={day.getDate()}></Day>)
  }
  
  return (
    <div className="week">
      {/* <Header></Header> */}
      <div className="columns">
        {days}
      </div>
    </div>
  )
}