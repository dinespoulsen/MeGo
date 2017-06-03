import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import User from './User.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={SignupForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/users/:id' component={User} />
        </div>
      </Router>
    )
  }
}
