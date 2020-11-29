
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//import Login from './components/login/Login';
import Photos from './components/photos/Photos'


function App() {
  return (
    <Router>
        <Switch>
          {/*<Route exact path='/login/' component={login} />*/}
          <Route exact path='/photos/' component={Photos} />
        </Switch>
</Router>
  );
}

export default App;
