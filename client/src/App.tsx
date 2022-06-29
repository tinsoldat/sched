import React, { useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { IEvent } from './contexts/EventsContext'
import { useFetch } from './hooks/fetch.hook'
import { ILiver, LiversContext } from './contexts/LiversContext'

function App() {
  const { response: livers } = useFetch<ILiver[]>('api/livers')
  const { response: events, isLoading, error } = useFetch<IEvent[]>('api/events')
  const [date, setDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() - date.getDay())
    return date
  })

  events?.forEach(val => val.date = new Date(val.date))

  return (
    <div className="App">
      <LiversContext.Provider value={livers || []}>
        <Navbar />
        <div className="main">
          {isLoading && <div className="spinner">Loading...</div>}
          {error && <div className="error">{error.message}</div>}
          {<Week events={events || []} date={date} />}
        </div>
      </LiversContext.Provider>
    </div>
  );
}

export default App;