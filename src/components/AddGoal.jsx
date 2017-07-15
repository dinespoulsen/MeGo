import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import toastr from 'toastr';
import { setPreviewImageUrl } from "../helpers/modelExtensions.js";
import Spinner from 'react-spinkit';
import { Map } from 'immutable';

class AddGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: ""
    }

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleTitleChange(event){
    this.setState({
      title: event.target.value
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
    let goal = {
      title: this.state.title,
      description: this.state.description,
    }

    fetch("/goals",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goal)
    }).then(message => message.json())
    .then(result => this.handleAddResult(result));
  }

  handleAddResult(result) {
    if(result.success === true){
      this.props.addGoal(result.goal);
      let fetchInfo = Map({isFetching: false, isFetchSuccess: true});
      this.props.fetchData(fetchInfo);
      this.props.history.push('/users/' + result.userId);
      toastr.success('Goal Added');
    }
    else {
      //
    }
  }

  render() {
    return (
      <div className="input-layout-container">

        <div className="input-layout-row">
          <div className="input-layout-column-label">
            <label>Titel:</label>
          </div>
          <div className="input-layout-column-input">
            <input type="text" onChange={this.handleTitleChange}/>
          </div>
        </div>

        <div className="input-layout-row">
          <div className="input-layout-column-label">
            <label>Desc:</label>
          </div>
          <div className="input-layout-column-input">
            <input type="text" onChange={this.handleDescriptionChange}/>
          </div>
        </div>

        <div className="input-layout-row">
          <button disabled={this.props.fetchInfo.get("isFetching")} onClick={this.handleAddClick}>Add</button>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchInfo: state.get("fetchInfo")
   }
}

export default connect(mapStateToProps, actionCreators)(AddGoal)
