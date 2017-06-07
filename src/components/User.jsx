import React from 'react';
import {connect} from 'react-redux';
import Header from './Header.jsx';
import ConnectedEditUser from './EditUser.jsx';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
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
    // handle when failure
  }

  handleEditClick(){
    if(this.props.editProfile.get("isEditing")) {
      return this.props.editUser(!this.props.editProfile.get("isEditing"));
    }
    this.props.editUser(true);
  }

  render() {
    return (
      <div>
        <p>{this.props.user ? this.props.user.get("name") : ""}</p>
        <p>{this.props.user ? this.props.user.get("email") : ""}</p>
        <ConnectedEditUser></ConnectedEditUser>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get("user"),
    editProfile: state.get("editUser")
   }
}

export default connect(mapStateToProps, actionCreators)(User)
