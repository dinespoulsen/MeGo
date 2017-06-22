import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';

export default class AddMemory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreviewUrl: "",
      title: "",
      location: "",
      description: ""
    }

    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleFileSelection(event){
    let file = event.target.files[0];
    console.log(file);
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

  handleTitleChange(event){
    this.setState({
      title: event.target.value
    })
  }

  handleLocationChange(event){
    this.setState({
      location: event.target.value
    })
  }

  handleDescriptionChange(event){
    this.setState({
      description: event.target.value
    })
  }

  handleAddClick(event){
    event.preventDefault();
    let memory = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      imageUrl: this.state.imagePreviewUrl
    }

    fetch("/memories",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memory)
    }).then(message => message.json())
    .then(result => console.log(result));
  }

  // handleSignupResult(result) {
  //   if(result.success === true){
  //     let user = Map({email: this.state.email, id: result.user._id, name: ""});
  //     this.props.addUser(user);
  //     this.props.history.push('/users/' + result.user._id);
  //     toastr.success('Great you signed up!!!!');
  //   }
  //   else {
  //     this.setState({errorMessageEmail: result.message});
  //   }
  // }

  render() {
    return (
      <div className="add-memory-container">

        <div className="add-memory-image-row">
          { this.state.imagePreviewUrl !== "" ? <img src={this.state.imagePreviewUrl}/> : <img src="MeGo-logo.png"/>}
        </div>

        <div className="add-memory-uploader-row">
          <input type="file" onChange={this.handleFileSelection} />
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
            <label>Titel:</label>
          </div>
          <div className="add-memory-column-input">
            <input type="text" onChange={this.handleTitleChange}/>
          </div>
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
            <label>Location:</label>
          </div>
          <div className="add-memory-column-input">
            <input type="text" onChange={this.handleLocationChange} />
          </div>
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
            <label>Description:</label>
          </div>
          <div className="add-memory-column-input">
            <textarea onChange={this.handleDescriptionChange} />
          </div>
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
          </div>
          <div className="add-memory-column-input">
            <button onClick={this.handleAddClick}>Add</button>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}
