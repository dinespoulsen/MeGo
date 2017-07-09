import React from 'react';
import {connect} from 'react-redux';

export default class GoalItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    console.log(this.props.id);
  }

  render() {
    return (
      <div className="time-item-row">
        <div className="item-image">
          <p className="achieved" onClick={this.handleOnClick}>&#x4e;</p>
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
