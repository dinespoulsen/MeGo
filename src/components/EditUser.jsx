import React from 'react';
import {connect} from 'react-redux';
import ConnectedEditForm from './EditForm.jsx';
import * as actionCreators from '../actionCreators';


class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveUSerDataResult = this.handleSaveUSerDataResult.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  handleEditClick(){
    if(this.props.editProfile.get("isEditing")){
      let email = this.props.user.get("email");
      let name = this.props.user.get("name");
      return this.saveUserData(email, name);
    }
    this.props.editUser(true);
  }

  saveUserData(email, name){
    let userData = {
      email: email,
      name: name
    }
    fetch("/users/" + this.props.user.get("id"),{
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(message => message.json())
    .then(result => {
      this.handleSaveUSerDataResult(result);
    });

  }

  handleSaveUSerDataResult(result){
    if(result.success){
      return this.props.editUser(!this.props.editProfile.get("isEditing"))
    }
    console.log("fail");
    //handle failed user update
  }

  render() {
    let editForm = this.props.editProfile.get("isEditing") ? (<ConnectedEditForm></ConnectedEditForm>) : "";
    return (
      <div>
        <button onClick={this.handleEditClick}>{this.props.editProfile.get("isEditing") ? "Save" : "Edit"}</button>
        { editForm }
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

export default connect(mapStateToProps, actionCreators)(EditUser)
