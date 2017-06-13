import React from 'react';
import {connect} from 'react-redux';
import s3 from "../../config/s3.js";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUrl: ""
    }
    this.getImageSrc = this.getImageSrc.bind(this);
    this.getSignedUrl = this.getSignedUrl.bind(this);
    this.handleSignedUrlResult = this.handleSignedUrlResult.bind(this);
  }

  componentDidMount(){
    this.getSignedUrl("mego-images", this.props.avatarFileName);
  }

  getImageSrc(){
    if(this.props.avatarUrl){
      return this.props.avatarUrl;
    }
    return this.state.signedUrl;
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
    this.setState({
      signedUrl: result.signedUrl
    })
  }

  render() {
    return (
      <div>
        {this.props.avatarFileName ? <img src={this.getImageSrc()}/> : <img width="200" src={this.getImageSrc()}/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.get("avatarUrl"),
    avatarFileName: state.get("user").get("avatarFileName")
   }
}

export default connect(mapStateToProps)(Avatar)
