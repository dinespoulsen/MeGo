import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import Header from './Header.jsx';
import connectedLoginForm from './LoginForm.jsx';
import connectedSignupForm from './SignupForm.jsx';
import connectedUser from './User.jsx';
import connectedEditUserPage from './EditUserPage.jsx';
import connectedAddMemory from './AddMemory.jsx';
import connectedAddGoal from './AddGoal.jsx';
import connectedTimeLine from './TimeLine.jsx';

let Router;
export default Router = () => (
  <div>
    <Header></Header>
      <Switch>
        <Route path='/login' component={connectedLoginForm} />
        <Route path='/signup' component={connectedSignupForm} />

        <Route path='/users/:id/edit' component={connectedEditUserPage} />
        <Route path='/users/:id' component={connectedUser} />

        <Route path='/time' component={connectedTimeLine} />

        <Route path='/goals/add' component={connectedAddGoal} />
        <Route path='/memories/add' component={connectedAddMemory} />
      </Switch>
  </div>

)
