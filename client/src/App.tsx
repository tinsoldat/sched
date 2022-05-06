import React, { useCallback, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { EventsContext, Event } from './contexts/EventsContext'
import { useEvents } from './hooks/events.hook'
import { useFetch } from './hooks/fetch.hook'
import { Liver } from './contexts/LiversContext'

function App() {
  const [filterOptions, setFilterOptions] = useState(new Set<string>())
  const [start] = useState(new Date('2022-04-25'))
  const [end] = useState(new Date('2022-05-01'))

  const filter = useCallback((val: Event) => {
    const isInDateRange = new Date(val.date) > start && new Date(val.date) < end
    let isIn = !val.feat.every(participant => !filterOptions.has(participant[0]))

    return isInDateRange && isIn
  }, [filterOptions, end, start])

  const toggle = (name: string): boolean => {
    let res = false
    const newFilterOptions = new Set(filterOptions)
    if (filterOptions.has(name)) {
      newFilterOptions.delete(name)
      res = false
    } else {
      newFilterOptions.add(name)
      res = true
    }
    setFilterOptions(newFilterOptions)
    return res
  }

  const { events, isLoading, error } = useEvents(filter, start)

  let { response: livers, isLoading: isLiversLoading } = useFetch<Liver[]>('api/livers')
  if (!livers) livers = []

  return (
    <div className="App">
        <Navbar toggle={toggle} filterOptions={filterOptions} livers={livers} />
      <EventsContext.Provider value={events as Event[][]}>
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