import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  isLoggedIn(){
    return !(this.props.user === undefined);
  }

  handleLinkClick(event){
    event.preventDefault();
    let fetchInfo = Map({isFetching: false, isFetchSuccess: ""});
    return this.props.fetchData(fetchInfo);
    this.props.history.push("/users/" + this.props.user.get("id"));
  }

  render() {

    let loginLogoutLink = this.isLoggedIn() ? <a href="/logout">Logout</a> : (<Link to="/login">Login</Link>);
    let profileLink = this.isLoggedIn() ? <Link to={"/users/" + this.props.user.get("id") } onClick={this.handleLinkClick}>Profile</Link> : <Link to="/">Signup</Link>;

    return (
      <div>
        { profileLink }
        { loginLogoutLink }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}

export default connect(mapStateToProps, actionCreators)(Header)
