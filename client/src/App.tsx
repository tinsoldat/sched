import React from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { EventsContext, Event } from './contexts/EventsContext'
import { useEvents } from './hooks/events.hook'
import { useFilter } from './hooks/filter.hook'

// import avatar from './images/avatar.png'

function App() {
  const { filter, start } = useFilter()
  const { events, isLoading, error } = useEvents(filter, start)

  return (
    <div className="App">
      <EventsContext.Provider value={events as Event[][]}>
        <Navbar />
        <div className="main">
          {isLoading && <div className="spinner">Loading...</div>}
          {error && <div className="error">{error.message}</div>}
          {<Week />}
        </div>
      </EventsContext.Provider>
    </div>
  );
}

export default App;