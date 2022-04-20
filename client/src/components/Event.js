import React from "react"

export const Event = (props) => {

  const { date, title, participants } = props.event

  return (
    <div className="event" style={ { 'top': (date.getHours() * 42 + date.getMinutes() * 0.7) + 'px' } }>
      <div className="time">{('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)}</div>
      <div className="participants">{participants}</div>
      <div className="title">{title}</div>
    </div>
  )
}