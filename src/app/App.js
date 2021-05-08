import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reunion from '../app/Reunion';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' component={Reunion} />
        {/* <Route path='/about' component={About} />
        <Route path='/events' component={Events} />
        <Route path='/annual' component={AnnualReport} />
        <Route path='/team' component={Teams} />
        <Route path='/blogs' component={Blogs} />
        <Route path='/sign-up' component={SignUp} /> */}
      </Switch>
    </Router>

  );
}

export default App;
