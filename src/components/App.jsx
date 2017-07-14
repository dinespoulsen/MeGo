import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import connectedLoginForm from './LoginForm.jsx';
import FrontPage from './FrontPage.jsx';
import RouterMain from './Router.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path='/' component={FrontPage} />
            <Route exact path='/login' component={connectedLoginForm} />
            <Route path='/' component={RouterMain}/>
          </Switch>
      </Router>
    )
  }
}
