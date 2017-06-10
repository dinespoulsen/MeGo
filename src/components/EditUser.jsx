import React from 'react';
import {connect} from 'react-redux';
import ConnectedEditForm from './EditForm.jsx';
import * as actionCreators from '../actionCreators';
import Spinner from 'react-spinkit';
import { Map } from 'immutable';

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveUSerDataResult = this.handleSaveUSerDataResult.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  handleEditClick(){
    if(this.props.editProfile.get("isEditing")){

      let fetchInfo = Map({isFetching: true, isFetchSuccess: ""});
      this.props.fetchData(fetchInfo);
      this.props.editUser(false);

      let email = this.props.user.get("email");
      let name = this.props.user.get("name");
      return this.saveUserData(email, name);
    }
    this.props.editUser(true);

    let fetchInfo = Map({isFetching: false, isFetchSuccess: ""});
    this.props.fetchData(fetchInfo);
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
      let fetchInfo = Map({isFetching: false, isFetchSuccess: true});
      return this.props.fetchData(fetchInfo);
    }
      let fetchInfo = Map({isFetching: false, isFetchSuccess: false});
      return this.props.fetchData(fetchInfo);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleEditClick}>{this.props.editProfile.get("isEditing") ? "Save" : "Edit"}</button>
        <ConnectedEditForm></ConnectedEditForm>
        {this.props.fetchInfo.get("isFetchSuccess") ? <p>Profile Saved</p> : ""}
        {this.props.fetchInfo.get("isFetchSuccess") === false ? <p>Profile could not be saved!</p> : ""}
        {this.props.fetchInfo.get("isFetching") ? (<Spinner name="three-bounce" />) : ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get("user"),
    editProfile: state.get("editUser"),
    fetchInfo: state.get("fetchInfo")
   }
}

export default connect(mapStateToProps, actionCreators)(EditUser)
