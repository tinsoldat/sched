import React from "react"

export const Event = (props) => {

  const { date, title, feat } = props.event

  return (
    <div className="event" style={{ 'top': ((date.getHours() * 60 + date.getMinutes()) / 14.4) + '%' }}>
      <div className="main-info">
        <div className="liver-info">
          <div className="avatars-container"><img src={require('./petra.png')} alt="avatar" className="avatar" /></div>
          <div className="name">{feat}</div>
        </div>
        <div className="time">{('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)}</div>
      </div>
      <div className="description">{title}</div>
    </div>
  )
}