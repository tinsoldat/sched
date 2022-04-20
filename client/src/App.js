import './App.css';
import { Context } from './contexts/Context';
import { MainPage } from './components/MainPage';

const schedule = {
  events: [
    {
      title: '1 Minute Niji Drawings',
      participants: ['Petra Gurin'],
      urls: ['https://www.youtube.com/watch?v=Mp5bwFeD-SA'],
      date: new Date(),
      type: 'Talking Stream',
      tags: ['drawing', 'english'],
      source: 'https://nitter.net/Petra_Gurin/status/1515910817166008321#m'
    },
    {
      title: '1 Minute Niji Drawings',
      participants: ['Petra Gurin'],
      urls: ['https://www.youtube.com/watch?v=Mp5bwFeD-SA'],
      date: new Date(1650631765471),
      type: 'Talking Stream',
      tags: ['drawing', 'english'],
      source: 'https://nitter.net/Petra_Gurin/status/1515910817166008321#m'
    }
  ],
}

function App() {
  return (
    <div className="container">
      <Context.Provider value={schedule}>
        <MainPage />
      </Context.Provider>
    </div>
  );
}

export default App;
