import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import toastr from 'toastr';
import { setPreviewImageUrl } from "../helpers/modelExtensions.js"

class AddMemory extends React.Component {
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
    setPreviewImageUrl(file, this);
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
      dataUrl: this.state.imagePreviewUrl
    }

    fetch("/memories",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memory)
    }).then(message => message.json())
    .then(result => this.handleAddResult(result));
  }

  handleAddResult(result) {
    if(result.success === true){
      this.props.addMemory(result.memory);
      this.props.history.push('/users/' + result.userId);
      toastr.success('Memory saved!!!!');
    }
    else {
      //
    }
  }

  render() {
    return (
      <div className="add-memory-container">

        <div className="add-memory-row">
          { this.state.imagePreviewUrl !== "" ? <img src={this.state.imagePreviewUrl}/> : <img src="MeGo-logo.png"/>}
        </div>

        <div className="add-memory-row">
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
          <button onClick={this.handleAddClick}>Add</button>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}

export default connect(mapStateToProps, actionCreators)(AddMemory)
