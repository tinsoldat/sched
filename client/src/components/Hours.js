import React from "react"

export const Hours = () => {

  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push(
      <div className="hour" key={i}>
        <span className="hour-mark">{i}h</span>
      </div>
    )
  }

  return (
    <div className="hours">
      {hours}
    </div>
  )
}