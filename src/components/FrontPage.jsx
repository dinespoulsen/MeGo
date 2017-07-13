import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="frontpage-body">
        <div id="baground-opacity">
          <Link id="login-button" to="/login">LOGIN</Link>
          <footer>
            <ul id="footer-nav-container">
              <li>About Mego</li>
              <li>Help</li>
              <li>Policy</li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}
