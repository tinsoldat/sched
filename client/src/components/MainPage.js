import React from 'react'
import { Toolbar } from './Toolbar'
import { Week } from './Week'

const weekStartDate = new Date()

export const MainPage = () => {
  const first = 'sunday'
  return (
    <div className="main">
      <Toolbar></Toolbar>
      <Week first={first} date={weekStartDate}></Week>
    </div>
  )
}