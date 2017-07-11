import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';

export default class GoalItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleAchievedClick = this.handleAchievedClick.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.handleAchievedResult = this.handleAchievedResult.bind(this);
  }

  getClassName(){
    if(!this.props.achieved) {
      return "achieved-false";
    }
    return "achieved-true";
  }

  handleAchievedClick(){
    let goalObject = {id: this.props.id, achieved: !this.props.achieved};
    this.props.achievedGoal(goalObject);
    let goal = {
      id: this.props.id,
      achieved: !this.props.achieved
    };

    fetch("/goals/" + this.props.id,{
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goal)
    }).then(message => message.json())
    .then(result => this.handleAchievedResult(result));
  }

  handleAchievedResult(result){
    console.log(result);
  }

  render() {
    return (
      <div className="time-item-row">
        <div className="item-image">
          <p className={this.getClassName()} onClick={this.handleAchievedClick}>&#x4e;</p>
        </div>
        <div>
          <p className="item-date">{this.props.createdAt}</p>
          <p>{this.props.title}</p>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
