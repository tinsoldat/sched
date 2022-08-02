import React, { useEffect, useState } from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Sidebar } from './components/sidebar/Sidebar'
import { Week } from './components/Week'
import { useFetch } from './hooks/fetch.hook'
import { ILiver, LiversContext } from './contexts/LiversContext'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { IEvent, insertEvents } from './features/events/eventsSlice'

function App() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const { response: livers } = useFetch<ILiver[]>('api/livers');
  const { response: events, isLoading, error } = useFetch<IEvent[]>('api/events');

  const [date] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay());
    return date;
  });
  //save filter to local storage on page hide
  useEffect(() => {
    const saveToLocalStorage: EventListener = () => document.visibilityState === 'hidden' && window.localStorage.setItem('filter', JSON.stringify(filter));
    document.addEventListener('visibilitychange', saveToLocalStorage);
    return () => document.removeEventListener('visibilitychange', saveToLocalStorage);
  });

  useEffect(() => {
    if (events) dispatch(insertEvents({ events }));
  }, [dispatch, events]);


  return (
    <div className="App">
      <LiversContext.Provider value={livers || []}>
        <Sidebar />
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