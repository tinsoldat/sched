import React from 'react'
import { Toolbar } from './Toolbar'
import { Week } from './Week'

export const MainPage = () => {
  const first = 'sunday'
  const weekStartDate = new Date()
  return (
    <div className="main">
      <Toolbar></Toolbar>
      <Week first={first} date={weekStartDate}></Week>
    </div>
  )
}