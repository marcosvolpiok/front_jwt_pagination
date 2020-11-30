
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import PhotosContainer from './components/photos/'
import './App.css';

class App extends React.Component {


  render() {

    return(
      <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/photos/' component={PhotosContainer} />
          </Switch>

      </Router>
    );
  }
}

export default App;
