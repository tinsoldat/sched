import React from 'react'
import './styles/App.sass'
import './styles/common.sass'
import { Navbar } from './components/Navbar'
import { Week } from './components/Week'
import { EventsContext, Event } from './contexts/EventsContext'
import { useWeek } from './hooks/week.hook'

// import avatar from './images/avatar.png'

function App() {

  const { week, isLoading } = useWeek(new Date('2022-04-28'))

  return (
    <div className="App">
      <EventsContext.Provider value={week as Event[][]}>
        <Navbar />
        <div className="main">
          {isLoading ? '' : <Week />}
        </div>
      </EventsContext.Provider>
    </div>
  );
}

export default App;