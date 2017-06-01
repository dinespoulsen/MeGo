import React from 'react'

export default class SignupForm extends React.Component {

  render() {
    return (
      <div>
        <form action="/signup" method="post">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email"/>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
