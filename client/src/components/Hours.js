import React from "react"

export const Hours = () => {

  const hours = []
  for (let i = 1; i < 24; i++) {
    hours.push(
      <div className="hour" key={i}>
        <div className="hour-separator"></div>
        <span className="hour-mark">{i}h</span>
      </div>
    )
  }

  return (
    <div className="hours-container">
      <div className="hour">
        <div className="hour-separator"></div>
      </div>
      {hours}
    </div>
  )
}