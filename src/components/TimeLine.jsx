import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';
import * as actionCreators from '../actionCreators';
import TimeItem from "./TimeItem.jsx";
import GoalItem from "./GoalItem.jsx";

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
    let items = this.props.memories.concat(this.props.goals);
    let sortedItems = items.sort((itemOne, itemTwo) => {return new Date(itemTwo.createdAt) - new Date(itemOne.createdAt)});
    let timeItems = sortedItems.map((item, index) => {
      return item.hasOwnProperty('achieved') ?
      <GoalItem id={item._id} key={index} createdAt={this.formatDate(item.createdAt)} title={item.title} description={item.description}/> :
      <TimeItem key={index} signedUrl={item.signedUrl} createdAt={this.formatDate(item.createdAt)} title={item.title} description={item.description}/>
    })
    return (
      <div className="time-line-container">
        {timeItems}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    memories: state.get("user").get("memories"),
    goals: state.get("user").get("goals")
   }
}

export default connect(mapStateToProps, actionCreators)(TimeLine)
