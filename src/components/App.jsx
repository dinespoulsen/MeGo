import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={SignupForm} />
          <Route path='/loginpage' component={LoginForm} />
        </div>
      </Router>
    )
  }
}
