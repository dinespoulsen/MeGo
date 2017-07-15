import React from 'react';
import {connect} from 'react-redux';
import s3 from "../../config/s3.js";
import * as actionCreators from '../actionCreators';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.getImageSrc = this.getImageSrc.bind(this);
  }

  getImageSrc(){
    if(this.props.avatarUrl !== ""){
      return this.props.avatarUrl;
    }
    if(this.props.avatarSignedUrl) {
      return this.props.avatarSignedUrl;
    }
    if(!this.props.avatarFileName) {
      return "../image-placeholder.png";
    }
  }

  render() {
    return (
      <img id="avatar" width="200" height="200" src={this.getImageSrc()}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.get("avatarUrl"),
    avatarSignedUrl: state.get("avatarSignedUrl")
   }
}

export default connect(mapStateToProps, actionCreators)(Avatar)
