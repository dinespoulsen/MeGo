import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';
import ReactCrop from 'react-image-crop';
import CropStyles from 'react-image-crop/dist/ReactCrop.css';
import ConnectAvatarSelector from './AvatarSaver.jsx'

class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: ""
    }
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.handleImageCrop = this.handleImageCrop.bind(this);
    this.setInitialAvatar = this.setInitialAvatar.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }

  handleFileSelection(event){
    let file = event.target.files[0];
    var img = new Image;

    let _this = this;
    img.onload = function() {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let MAX_WIDTH = 500;
      let MAX_HEIGHT = 500;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      var dataUrl = canvas.toDataURL("image/jpg");
      _this.setState({
        imagePreviewUrl: dataUrl
      })
    }

    if(file){
      img.src = URL.createObjectURL(file);
    }
  }

  handleImageCrop(crop, pixelCrop){
    this.cropImage(crop, pixelCrop);
  }

  setInitialAvatar(crop, image, pixelCrop){
    this.cropImage(crop, pixelCrop);
  }

  cropImage(crop, pixelCrop){
    let canvas = document.createElement('canvas');
    let img = new Image;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let _this = this;

    img.onload = function(){
      canvas.width = 200;
      canvas.height = 200;
      ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0 , 200, 200);
      let dataUrl = canvas.toDataURL("image/jpg");
      _this.props.saveAvatarPreview(dataUrl);
    };
    img.src = this.state.imagePreviewUrl;
  }

  render() {
    return (
      <div>
        {this.state.imagePreviewUrl === "" ? <input type="file" onChange={this.handleFileSelection} /> : <ConnectAvatarSelector></ConnectAvatarSelector>}
        <div>
          {this.state.imagePreviewUrl !== "" ? <ReactCrop src={this.state.imagePreviewUrl} onImageLoaded={this.setInitialAvatar} onChange={this.handleImageCrop} crop={{x: 10, y: 10, width: 60, aspect: 1/1}} /> : ""}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actionCreators)(AvatarUpload)
