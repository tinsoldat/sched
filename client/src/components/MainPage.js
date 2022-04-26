import React from 'react'
import { Week } from './Week'

const weekStartDate = new Date()

export const MainPage = () => {

  const first = 'sunday'

  return (
    <div className="main">
      <Week first={first} date={weekStartDate} />
    </div>
  )
}