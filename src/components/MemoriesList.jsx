import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';

export default class MemoriesList extends React.Component {
  constructor(props) {
    super(props);

  }

  buildMemory(title, signedUrl, index) {
    return (<div className="memory-item" key={index}><p>{title}</p><img src={signedUrl}/></div>);
  }

  render() {

    let memories = this.props.memories !== "" ? this.props.memories.map((memory, index) => this.buildMemory(memory.title, memory.signedUrl, index)) : ""
    return (
      <div className="memories-container">
        {memories}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   }
}
