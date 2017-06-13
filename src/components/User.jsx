import React from 'react';
import {connect} from 'react-redux';
import Header from './Header.jsx';
import ConnectedAvatarUpload from './AvatarUpload.jsx';
import ConnectedAvatar from './Avatar.jsx'
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
      let user = Map({email: result.user.local.email, id: result.user._id, name: result.user.local.name, avatarFileName: result.user.local.avatarFileName});
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
        {this.props.user ? <ConnectedAvatar></ConnectedAvatar> : ""}
        <ConnectedAvatarUpload></ConnectedAvatarUpload>
        <p>Name: <span>{this.props.user ? this.props.user.get("name") : ""}</span></p>
        <p>Email: <span>{this.props.user ? this.props.user.get("email") : ""}</span></p>
        { this.props.user ? <ConnectedEditUser></ConnectedEditUser> : ""}
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
