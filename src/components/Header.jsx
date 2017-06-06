import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn(){
    return !(this.props.user === undefined);
  }

  render() {
    let loginLogoutLink = this.isLoggedIn() ? <a href="/logout">Logout</a> : (<Link to="/login">Login</Link>);
    let profileLink = this.isLoggedIn() ? <Link to={"/users/" + this.props.user.get("id") }>Profile</Link> : "";
    return (
      <div>
        { profileLink }
        <Link to="/">Signup</Link>
        { loginLogoutLink }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}

export default connect(mapStateToProps)(Header)
