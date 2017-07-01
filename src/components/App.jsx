import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import connectedLoginForm from './LoginForm.jsx';
import connectedSignupForm from './SignupForm.jsx';
import connectedUser from './User.jsx';
import connectedEditUserPage from './EditUserPage.jsx';
import Header from './Header.jsx';
import connectedAddMemory from './AddMemory.jsx'
import connectedTimeLine from './TimeLine.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path='/' component={connectedSignupForm} />
            <Route path='/login' component={connectedLoginForm} />

            <Route path='/users/:id/edit' component={connectedEditUserPage} />
            <Route path='/users/:id' component={connectedUser} />

            <Route path='/time' component={connectedTimeLine} />

            <Route path='/memories/add' component={connectedAddMemory} />
          </Switch>
        </div>
      </Router>
    )
  }
}
