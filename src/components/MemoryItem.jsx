import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';

export default class MemoryItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="time-item-row">
        <div className="item-image">
          <img src={this.props.signedUrl}/>
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
