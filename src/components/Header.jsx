import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleMenu: false
    }
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleOnClickToggle = this.handleOnClickToggle.bind(this);
  }

  isLoggedIn(){
    return !(this.props.user === undefined);
  }

  onClickHandler(){
    this.setState({
      isToggleMenu: false
    })
    let fetchInfo = Map({isFetching: false, isFetchSuccess: ""});
    this.props.fetchData(fetchInfo);
    this.props.saveAvatarPreview("");
    this.props.isCroppingImage(false);
  }

  handleOnClickToggle(){
    this.setState({
      isToggleMenu: !this.state.isToggleMenu
    })
  }

  render() {

    let loginLogoutLink = this.isLoggedIn() ? <a href="/logout" className="header-link">LOGOUT</a> : (<Link to="/login" className="header-link">LOGIN</Link>);
    let profileLink = this.isLoggedIn() ? <Link to={"/users/" + this.props.user.get("id") } onClick={this.onClickHandler} className="header-link">PROFILE</Link> : <Link to="/signup" className="header-link">SIGNUP</Link>;
    let toggleMenuLink = this.isLoggedIn() ? <button onClick={this.handleOnClickToggle} id="add-memory">&#x4c;</button> : "";
    let timeLink = this.isLoggedIn() ? <Link to="/time" onClick={this.onClickHandler} className="header-link">TIME</Link> : "";
    return (
      <header className="header-container">

        { profileLink }
        { timeLink }
        { loginLogoutLink }
        <div className="add-bar-container">
          { toggleMenuLink }
          { this.state.isToggleMenu ?
                (<ul className="add-bar-menu">
                    <li><Link className="menu-link" onClick={this.onClickHandler} to="/memories/add">Memory</Link></li>
                    <li><Link className="menu-link" onClick={this.onClickHandler} to="/goals/add">Goal</Link></li>
                </ul>) : ""
          }
        </div>


      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get("user")
  }
}

export default connect(mapStateToProps, actionCreators)(Header)
