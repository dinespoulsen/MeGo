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
      return "MeGo-logo.png";
    }
  }

  render() {
    return (
      <img id="avatar" src={this.getImageSrc()}/>
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
