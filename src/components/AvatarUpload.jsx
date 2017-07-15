import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';
import ReactCrop from 'react-image-crop';
import CropStyles from 'react-image-crop/dist/ReactCrop.css';
import ConnectedAvatarSaver from './AvatarSaver.jsx'
import { setPreviewImageUrl } from "../helpers/modelExtensions.js"

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
    this.props.isCroppingImage(true);
    let file = event.target.files[0];
    setPreviewImageUrl(file, this);
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
      <div className="file-holder">
        {this.props.isCropping === true ? <ReactCrop src={this.state.imagePreviewUrl} onImageLoaded={this.setInitialAvatar} onChange={this.handleImageCrop} crop={{x: 10, y: 10, width: 60, aspect: 1/1}} /> : ""}

        {this.props.isCropping !== true ?
          (<div><input type="file" id="file" className="inputfile" onChange={this.handleFileSelection} /><label htmlFor="file">Choose a file</label></div>) :
          <ConnectedAvatarSaver></ConnectedAvatarSaver>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isCropping: state.get("isCropping")
  }
}

export default connect(mapStateToProps, actionCreators)(AvatarUpload)
