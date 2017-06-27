import React from 'react';
import {connect} from 'react-redux';
import Header from './Header.jsx';
import ConnectedAvatarUpload from './AvatarUpload.jsx';
import ConnectedAvatar from './Avatar.jsx';
import MemoriesList from "./MemoriesList.jsx";
import * as actionCreators from '../actionCreators';
import { Map, List } from 'immutable';
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
      let user = Map({memories: List(result.user.memoryObjects),
                  email: result.user.local.email,
                  id: result.user._id,
                  name: result.user.local.name,
                  avatarFileName: result.user.local.avatarFileName
                });
      this.props.addUser(user);
      this.props.saveAvatarSignedUrl(result.user.avatarSignedUrl);
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
        <div className="user-info-container">
          <div>
            {this.props.user ? <ConnectedAvatar></ConnectedAvatar> : ""}
            <ConnectedAvatarUpload></ConnectedAvatarUpload>
          </div>

          <div>
            <h3>{this.props.user ? this.props.user.get("name") : ""}</h3>
            <p><span>{this.props.user ? this.props.user.get("memories").size : ""}</span> memories</p>
          </div>

          <div>
            {this.props.user ? <Link id="edit-user-button" to={"/users/" + this.props.user.get("id") + "/edit"}>Edit Profile</Link> : ""}
          </div>
        </div>

        {this.props.user ? <MemoriesList memories={this.props.user.get("memories")}></MemoriesList> : ""}
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
