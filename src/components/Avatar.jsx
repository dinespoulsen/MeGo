import React from 'react';
import {connect} from 'react-redux';
import s3 from "../../config/s3.js";
import * as actionCreators from '../actionCreators';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.getImageSrc = this.getImageSrc.bind(this);
    this.getSignedUrl = this.getSignedUrl.bind(this);
    this.handleSignedUrlResult = this.handleSignedUrlResult.bind(this);
  }

  componentDidMount(){
    if(this.props.avatarSignedUrl === undefined && this.props.avatarFileName){
      return  this.getSignedUrl("mego-images", this.props.avatarFileName);
    }
  }

  getImageSrc(){
    if(this.props.avatarUrl){
      return this.props.avatarUrl;
    }
    return this.props.avatarSignedUrl;
  }

  getSignedUrl(bucket, key){
    let request_object = {
      bucket: bucket,
      key: key
    };

    let signin_url = '/s3signedurl';
    fetch(signin_url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_object)
    }).then(message => message.json())
    .then(result => this.handleSignedUrlResult(result));
  }

  handleSignedUrlResult(result){
    this.props.saveAvatarSignedUrl(result.signedUrl);
  }

  render() {
    return (
      <div>
        {this.props.avatarFileName ? <img id="avatar" src={this.getImageSrc()}/> : <img id="avatar" width="200" src="MeGo-logo.png"/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.get("avatarUrl"),
    avatarFileName: state.get("user").get("avatarFileName"),
    avatarSignedUrl: state.get("avatarSignedUrl")
   }
}

export default connect(mapStateToProps, actionCreators)(Avatar)
