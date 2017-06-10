import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import connectedLoginForm from './LoginForm.jsx';
import connectedSignupForm from './SignupForm.jsx';
import connectedUser from './User.jsx';
import Header from './Header.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path='/' component={connectedSignupForm} />
            <Route path='/login' component={connectedLoginForm} />
            <Route path='/users/:id' component={connectedUser} onChange={onRouteChancheHandler}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

function onRouteChancheHandler(){
  console.log("test");
}
