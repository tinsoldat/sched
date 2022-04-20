import React from "react"

export const Hours = () => {

  const hours = []
  for (let i = 1; i < 24; i++) {
    hours.push(
      <div className="hour" key={i}>
        <span className="hour-mark">{i}h</span>
      </div>
    )
  }

  return (
    <div className="hours">
      <div className="corner"></div>
      <div className="hour"></div>
      {hours}
    </div>
  )
}