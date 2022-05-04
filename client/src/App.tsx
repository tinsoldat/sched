import React from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { Event } from './typings'
import { useEvents } from './hooks/events.hook'
import { useFilter } from './hooks/filter.hook'

// import avatar from './images/avatar.png'

function App() {
  const { filter, start } = useFilter()
  const { events, isLoading, error } = useEvents(filter, start)

  return (
    <div className="App">
      <Navbar />
      <div className="main">
        {isLoading && <div className="spinner">Loading...</div>}
        {error && <div className="error">{error.message}</div>}
        {<Week events={events as Event[][]} />}
      </div>
    </div>
  );
}

export default App;