import React from 'react';
import {connect} from 'react-redux';
import ConnectedEditForm from './EditForm.jsx';
import * as actionCreators from '../actionCreators';


class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(){
    if(this.props.editProfile.get("isEditing")){
      return this.props.editUser(!this.props.editProfile.get("isEditing"));
    }
    this.props.editUser(true);
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
