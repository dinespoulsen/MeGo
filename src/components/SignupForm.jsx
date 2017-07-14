import React from 'react';
import toastr from 'toastr';
import * as actionCreators from '../actionCreators';
import {connect} from 'react-redux'
import { Map, List } from 'immutable';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  email: '',
                  password: '',
                  errorMessageEmail: ''
              };
    this.handleSignupResult = this.handleSignupResult.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({errorMessageEmail: ''})
    let request_object = {
      email: this.state.email,
      password: this.state.password
    }
    let signin_url = '/signup';

    fetch(signin_url,{
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_object)
    }).then(message => message.json())
    .then(result => this.handleSignupResult(result));
  }

  handleSignupResult(result) {
    if(result.success === true){
      let user = Map({email: this.state.email, id: result.user._id, name: "", memories: List(), goals: List()});
      this.props.addUser(user);
      this.props.history.push('/users/' + result.user._id);
      toastr.success('Great you signed up!!!!');
    }
    else {
      this.setState({errorMessageEmail: result.message});
    }
  }

  render() {
    return (
      <div className="form-container">
        <h2 className="form-title">Wellcome to Mego</h2>
        <form onSubmit={this.handleSubmit}>

          <div>
            {this.state.errorMessageEmail === "" ? "" : <p>{this.state.errorMessageEmail}</p>}
          </div>

          <div className="input-container">
            <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/>
          </div>

          <div className="input-container">
            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
          </div>

          <div className="input-container">
            <input type="submit" value="Signup"/>
          </div>

          <div className="input-container">
            <p className="form-bottom-text">A placeholder for text and a link for the policies of mego when signing up</p>
          </div>

        </form>
      </div>
    );
  }
}

export default connect(null, actionCreators)(SignupForm)
