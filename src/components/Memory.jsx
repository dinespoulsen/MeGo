import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';

export default class Memory extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="memory-item">
        <p>{this.props.title}</p>
        <img src={this.props.signedUrl}/>
      </div>
    );
  }
}
