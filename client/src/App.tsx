import React, { useCallback, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { EventsContext, Event } from './contexts/EventsContext'
import { FilterContext } from './contexts/FilterContext'
import { useEvents } from './hooks/events.hook'

// import avatar from './images/avatar.png'

function App() {
  const [livers, setLivers] = useState(new Set<string>())
  const [start] = useState(new Date('2022-04-25'))
  const [end] = useState(new Date('2022-05-01'))

  const filter = useCallback((val: Event) => {
    const isInDateRange = new Date(val.date) > start && new Date(val.date) < end
    let isIn = !val.feat.every(participant => !livers.has(participant[0]))

    return isInDateRange && isIn
  }, [livers, end, start])

  const toggle = (name: string): boolean => {
    if (livers.has(name)) {
      livers.delete(name)
      return false
    } else {
      livers.add(name)
      return true
    }
  }

  const { events, isLoading, error } = useEvents(filter, start)

  return (
    <div className="App">
      <EventsContext.Provider value={events as Event[][]}>
        <FilterContext.Provider value={toggle}>
          <Navbar />
          <div className="main">
            {isLoading && <div className="spinner">Loading...</div>}
            {error && <div className="error">{error.message}</div>}
            {<Week />}
          </div>
        </FilterContext.Provider>
      </EventsContext.Provider>
    </div>
  );
}

export default App;