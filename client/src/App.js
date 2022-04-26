import './App.css';
import { Context } from './contexts/EventContext';
import { MainPage } from './components/MainPage';

const context = {
  events: [
    {
      title: '1 Minute Niji Drawings',
      feat: ['Petra Gurin'],
      urls: ['https://www.youtube.com/watch?v=Mp5bwFeD-SA'],
      date: new Date(),
      type: 'Talking Stream',
      tags: ['drawing', 'english'],
      source: 'https://nitter.net/Petra_Gurin/status/1515910817166008321#m'
    },
    {
      title: '1 Minute Niji Drawings',
      feat: ['Petra Gurin'],
      urls: ['https://www.youtube.com/watch?v=Mp5bwFeD-SA'],
      date: (() => {const q = new Date(); q.setDate(30); q.setHours(15); q.setMinutes(0); return q})(),
      type: 'Talking Stream',
      tags: ['drawing', 'english'],
      source: 'https://nitter.net/Petra_Gurin/status/1515910817166008321#m'
    }
  ],
}

function App() {
  return (
    <div className="container">
      <Context.Provider value={context}>
        <div className="toolbar-container">Toolbar</div>
        <MainPage />
      </Context.Provider>
    </div>
  );
}

export default App;
