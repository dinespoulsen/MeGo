import React from 'react';
import {connect} from 'react-redux';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <footer>
        <ul id="footer-nav-container">
          <li>About Mego</li>
          <li>Help</li>
          <li>Policy</li>
        </ul>
      </footer>
    );
  }
}
