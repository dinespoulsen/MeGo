import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm.jsx';
import Footer from "./Footer.jsx";

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="frontpage-body">
          <Link id="login-button" to="/login">LOGIN</Link>
          <SignupForm history={this.props.history}></SignupForm>
          <Footer/>
      </div>
    );
  }
}
