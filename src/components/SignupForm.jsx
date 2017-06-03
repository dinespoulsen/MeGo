import React from 'react';
import toastr from 'toastr';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  email: '',
                  password: ''
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
      this.props.history.push('/users/test');
      toastr.success('Great you signed up!!!!');
    }
    else {
      console.log("could not log in");
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label >
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
          </label>
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
