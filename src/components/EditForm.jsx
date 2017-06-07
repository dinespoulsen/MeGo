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
      <div>
        <label>
          Name:
          <input type="text" onChange={this.handleNameChange} value={this.props.user.get("name")}/>
        </label>
        <label>
          Email:
          <input type="text" onChange={this.handleEmailChange} value={this.props.user.get("email")}/>
        </label>
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
