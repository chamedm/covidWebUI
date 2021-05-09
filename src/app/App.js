import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reunion from '../app/Reunion';
import Questions from '../app/Questions';
import Tracker from './Tracker';
import News from './News';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/dashboard' component={Reunion} />
        <Route path='/qa' component={Questions} />
        <Route path='/tracker' component={Tracker} />
        <Route path='/news' component={News} />
      </Switch>
    </Router>

  );
}

export default App;
