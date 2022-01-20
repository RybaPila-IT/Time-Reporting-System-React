import {
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom'

import { ProtectedRoute } from './Protected';
import {Login, Expired} from './Login'
import Home from './Home'

import ActivityList from './components/Activity/ActivityList';
import ReportList from './components/Report/ReportList';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

const Routes = () => {
  return (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/expired" component={Expired} />
        <ProtectedRoute exact path="/home" component={Home}/>
        <ProtectedRoute exact path="/activities" component={ActivityList}/>
        <ProtectedRoute exact path="/reports" component={ReportList}/>
      </Switch>
  );
}

export default App;
