import React from 'react';
import toastr from 'toastr';
import * as actionCreators from '../actionCreators';
import {connect} from 'react-redux';
import { Map, List } from 'immutable';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  email: '',
                  password: '',
                  errorMessageEmail: '',
                  errorMessagePassword: ''
                };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLoginResult = this.handleLoginResult.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearErrorMessages = this.clearErrorMessages.bind(this);
  }

  handleEmailChange(event) {
    this.clearErrorMessages();
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.clearErrorMessages();
    this.setState({password: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.clearErrorMessages();
    let request_object = {
      email: this.state.email,
      password: this.state.password
    };

    let signin_url = '/login';
    fetch(signin_url,{
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_object)
    }).then(message => message.json())
    .then(result => this.handleLoginResult(result));
  }

  handleLoginResult(result) {
    if(result.success === true){
      let user = Map({memories: List(result.user.memoryObjects),
                      goals: List(result.user.goalObjects),
                      email: this.state.email,
                      id: result.user._id,
                      name: result.user.local.name,
                      avatarFileName: result.user.local.avatarFileName
                });
      this.props.addUser(user);
      this.props.saveAvatarSignedUrl(result.user.avatarSignedUrl);
      this.props.history.push('/users/' + result.user._id);
      toastr.success('Great you got logged in!!!!');
    }
    else {
      let emailMessage = result.message.email ? result.message.email : '';
      let passwordMessage = result.message.password ? result.message.password : '';
      this.setState({
        errorMessageEmail: emailMessage,
        errorMessagePassword: passwordMessage
      });
    }
  }

  clearErrorMessages() {
    this.setState({
      errorMessageEmail: '',
      errorMessagePassword : ''
    });
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>

          <div>
            {this.state.errorMessageEmail === "" ? "" : <p>{this.state.errorMessageEmail}</p>}
          </div>

          <div className="input-container">
            <label>Email:</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
          </div>

          <div>
            {this.state.errorMessagePassword === "" ? "" : <p>{this.state.errorMessagePassword}</p>}
          </div>

          <div className="input-container">
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>

          <div className="input-container">
            <input type="submit" value="Login" />
          </div>

        </form>
      </div>
    );
  }
}

export default connect(null, actionCreators)(LoginForm)
