import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  isLoggedIn(){
    return !(this.props.user === undefined);
  }

  onClickHandler(){
    let fetchInfo = Map({isFetching: false, isFetchSuccess: ""});
    this.props.fetchData(fetchInfo);
  }

  render() {

    let loginLogoutLink = this.isLoggedIn() ? <a href="/logout" className="header-link">LOGOUT</a> : (<Link to="/login" className="header-link">LOGIN</Link>);
    let profileLink = this.isLoggedIn() ? <Link to={"/users/" + this.props.user.get("id") } onClick={this.onClickHandler} className="header-link">PROFILE</Link> : <Link to="/" className="header-link">SIGNUP</Link>;
    let addMemoryLink = this.isLoggedIn() ? <Link to="/memories/add" id="add-memory">&#x4c;</Link> : "";
    return (
      <header className="header-container">

        { addMemoryLink }
        { profileLink }
        { loginLogoutLink }

      </header>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}

export default connect(mapStateToProps, actionCreators)(Header)
