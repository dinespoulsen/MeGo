import React from 'react'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: ''
                };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    }).then((res) => res.json())
    .then((json) => console.log(json));
    // .then((json) => this.moveToPlace(json.place))
    // console.log(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" onChange={this.handleEmailChange}/>
          </label>
          <label>
            Password:
            <input type="password" onChange={this.handlePasswordChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
