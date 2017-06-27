import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(event) {
    this.props.editUserName(event.target.value);
  }

  handleEmailChange(event) {
    this.props.editUserEmail(event.target.value);
  }

  render() {
    return (
      <div className="edit-form-container">

        <div className="edit-form-row">
          <div className="edit-form-column-label">
            <label>Name:</label>
          </div>
          <div className="edit-form-column-input">
            <input type="text" onChange={this.handleNameChange} value={this.props.user.get("name") || ""}/>
          </div>
        </div>

        <div className="edit-form-row">
          <div className="edit-form-column-label">
            <label>Email:</label>
          </div>
          <div className="edit-form-column-input">
            <input type="text" onChange={this.handleEmailChange} value={this.props.user.get("email") || ""}/>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get("user")
   }
}

export default connect(mapStateToProps, actionCreators)(EditForm)
