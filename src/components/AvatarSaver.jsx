import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';

class AvatarSaver extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
  }

  handleOnSaveClick(){
    let request_object = {
      dataUrl: this.props.avatarUrl,
      fileName: "avatar"
    };

    let signin_url = '/s3upload';
    fetch(signin_url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_object)
    }).then(message => message.json())
    .then(result => console.log(result.success));

  }

  // handleUploadResult(){
  //
  // }

  render() {
    return (
      <div>
        <button onClick={this.handleOnSaveClick}>Save</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.get("avatarUrl")
   }
}

export default connect(mapStateToProps, actionCreators)(AvatarSaver)
