import React, { useEffect, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { useFetch } from './hooks/fetch.hook'
import { ILiver, LiversContext } from './contexts/LiversContext'
import { useAppDispatch } from './app/hooks'
import { IEvent, insertEvents } from './features/events/eventsSlice'

function App() {
  const dispatch = useAppDispatch();

  const { response: livers } = useFetch<ILiver[]>('api/livers')
  const { response: events, isLoading, error } = useFetch<IEvent[]>('api/events')

  const [date] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() - date.getDay())
    return date
  })

  useEffect(() => {
    if (events) dispatch(insertEvents({ events }));
  }, [dispatch, events]);
  

  return (
    <div className="App">
      <LiversContext.Provider value={livers || []}>
        <Navbar />
        <div className="main">
          {isLoading && <div className="spinner">Loading...</div>}
          {error && <div className="error">{error.message}</div>}
          {<Week date={date} />}
        </div>
      </LiversContext.Provider>
    </div>
  );
}

export default App;