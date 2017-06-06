import React from 'react';
import {connect} from 'react-redux';
import Header from './Header.jsx';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(this.props.user === undefined) {
      let signin_url = '/getuserdata';

      fetch(signin_url,{
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(message => message.json())
      .then(result => this.handleUserResult(result));
    }
  }

  handleUserResult(result) {
    if(result.success === true){
      let user = Map({email: result.user.local.email, id: result.user._id});
      this.props.addUser(user);
    }
    else {
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.user ? this.props.user.get("email") : ""}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}

export default connect(mapStateToProps, actionCreators)(User)
