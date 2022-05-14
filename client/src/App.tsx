import React, { useEffect, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { IEvent } from './contexts/EventsContext'
import { useFetch } from './hooks/fetch.hook'
import { ILiver, LiversContext } from './contexts/LiversContext'
//TODO choose current week
function App() {
  const [theme, setTheme] = useState('auto')
  const [language, setLanguage] = useState('english')
  const [filter, setFilter] = useState({
    livers: new Set<string>(),
  })
  const { response: livers } = useFetch<ILiver[]>('api/livers')
  const { response: events, isLoading, error } = useFetch<IEvent[]>('api/events')
  useEffect(() => {
    events?.forEach(val => val.date = new Date(val.date))
  })
  
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