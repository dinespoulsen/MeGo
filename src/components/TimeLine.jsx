import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';
import * as actionCreators from '../actionCreators';
import TimeItem from "./TimeItem.jsx";

class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(dateString){
    let dateObject = new Date(dateString);
    return dateObject.toDateString();
  }

  render() {
    let sortedMemories = this.props.memories.sort((memoryOne, memoryTwo) => {return new Date(memoryTwo.createdAt) - new Date(memoryOne.createdAt)});
    let TimeItems = sortedMemories.map((item, index) => { return <TimeItem key={index} signedUrl={item.signedUrl} createdAt={this.formatDate(item.createdAt)} title={item.title} description={item.description}/> })
    return (
      <div className="time-line-container">
        {TimeItems}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    memories: state.get("user").get("memories")
   }
}

export default connect(mapStateToProps, actionCreators)(TimeLine)
