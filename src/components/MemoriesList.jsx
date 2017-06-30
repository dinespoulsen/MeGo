import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';
import Memory from './Memory.jsx';
export default class MemoriesList extends React.Component {
  constructor(props) {
    super(props);

  }

  // buildMemory(title, signedUrl, index) {
  //   return (<div className="memory-item" key={index}><p>{title}</p><img src={signedUrl}/></div>);
  // }

  render() {

    let memories = this.props.memories !== "" ? this.props.memories.map((memory, index) => <Memory key={index} title={memory.title} signedUrl={memory.signedUrl} />) : "";
    return (
      <div className="memories-container">
        {memories}
      </div>
    );
  }
}
