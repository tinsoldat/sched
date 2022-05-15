import React, { useEffect, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { IEvent } from './contexts/EventsContext'
import { useFetch } from './hooks/fetch.hook'
import { ILiver, LiversContext } from './contexts/LiversContext'
import useLocalStorage from './hooks/localStorage.hook'
//TODO choose current week
function App() {
  const [theme, setTheme] = useState('auto')
  const [language, setLanguage] = useState('english')
  const [filter, setFilter] = useLocalStorage('filter', { livers: new Set<string>() },
    {
      replacer: (_key, value) => value instanceof Set ? [...value] : value,
      reviver: (key, value) => key === 'livers' ? new Set(value) : value
    })
  const { response: livers } = useFetch<ILiver[]>('api/livers')
  const { response: events, isLoading, error } = useFetch<IEvent[]>('api/events')

  events?.forEach(val => val.date = new Date(val.date))

  return (
    <div className="App">
      <LiversContext.Provider value={livers || []}>
        <Navbar filter={filter} setFilter={setFilter} />
        <div className="main">
          {isLoading && <div className="spinner">Loading...</div>}
          {error && <div className="error">{error.message}</div>}
          {<Week events={events || []} filter={filter} />}
        </div>
      </LiversContext.Provider>
    </div>
  );
}

export default App;