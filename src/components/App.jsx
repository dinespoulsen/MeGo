import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import connectedLoginForm from './LoginForm.jsx';
import connectedSignupForm from './SignupForm.jsx';
import User from './User.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={connectedSignupForm} />
          <Route path='/login' component={connectedLoginForm} />
          <Route path='/users/:id' component={User} />
        </div>
      </Router>
    )
  }
}
