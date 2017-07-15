import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import toastr from 'toastr';
import { setPreviewImageUrl } from "../helpers/modelExtensions.js";
import Spinner from 'react-spinkit';
import { Map } from 'immutable';

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
    let fetchInfo = Map({isFetching: true, isFetchSuccess: ""});
    this.props.fetchData(fetchInfo);
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
      let fetchInfo = Map({isFetching: false, isFetchSuccess: true});
      this.props.fetchData(fetchInfo);
      this.props.history.push('/users/' + result.userId);
      toastr.success('Memory saved!!!!');
    }
    else {
      //
    }
  }

  render() {
    return (
      <div className="edit-user-container">

        <div className="edit-form-row">
          { this.state.imagePreviewUrl !== "" ? <img src={this.state.imagePreviewUrl}/> : <img width="275" height="275" src="image-placeholder.png"/>}
        </div>

        <div className="edit-form-row">
          <input type="file" id="file" className="inputfile" onChange={this.handleFileSelection} />
          <label htmlFor="file">Choose a file</label>
        </div>

        <div className="edit-form-row">
          <div className="edit-form-column-label">
            <label>Titel:</label>
          </div>
          <div className="edit-form-column-input">
            <input type="text" onChange={this.handleTitleChange}/>
          </div>
        </div>

        <div className="edit-form-row">
          <div className="edit-form-column-label">
            <label>Location:</label>
          </div>
          <div className="edit-form-column-input">
            <input type="text" onChange={this.handleLocationChange} />
          </div>
        </div>

        <div className="edit-form-row">
          <div className="edit-form-column-label">
            <label>Desc:</label>
          </div>
          <div className="edit-form-column-input">
            <textarea onChange={this.handleDescriptionChange} />
          </div>
        </div>

          {this.props.fetchInfo.get("isFetching") ? (<div className="edit-form-row"><Spinner name="three-bounce" fadeIn='quarter' /></div>) : ""}

        <div className="edit-form-row">
          <button disabled={this.props.fetchInfo.get("isFetching")} onClick={this.handleAddClick}>Add</button>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get("user"),
    fetchInfo: state.get("fetchInfo")
   }
}

export default connect(mapStateToProps, actionCreators)(AddMemory)
