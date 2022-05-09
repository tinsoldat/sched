import React, { useCallback, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { EventsContext, IEvent } from './contexts/EventsContext'
import { useEvents } from './hooks/events.hook'
import { useFetch } from './hooks/fetch.hook'
import { ILiver, LiversContext } from './contexts/LiversContext'
//TODO choose current week
function App() {
  const [filterOptions, setFilterOptions] = useState(new Set<string>())
  const [start] = useState(() => {
    const temp = new Date()
    temp.setDate(temp.getDate() - temp.getDay())
    return temp
  })
  const [end] = useState(() => {
    const temp = new Date(start)
    temp.setDate(temp.getDate() + 7)
    return temp
  })

  const filter = useCallback(({ date, feat }: IEvent) => {
    const isInDateRange = new Date(date) > start && new Date(date) < end
    let isIn = !Object.keys(feat).every(name => !filterOptions.has(name))

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

  let { response: livers } = useFetch<ILiver[]>('api/livers')
  if (!livers) livers = []

  return (
    <div className="App">
      <LiversContext.Provider value={livers}>
        <EventsContext.Provider value={events as IEvent[][]}>

          <Navbar toggle={toggle} filterOptions={filterOptions} />
          <div className="main">
            {isLoading && <div className="spinner">Loading...</div>}
            {error && <div className="error">{error.message}</div>}
            {<Week />}
          </div>
        </EventsContext.Provider>
      </LiversContext.Provider>
    </div>
  );
}

export default App;