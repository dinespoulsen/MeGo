import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import { Map } from 'immutable';

export default class MemoriesList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let memories = this.props.memories.map((memory, index) => <p key={index}>{memory}</p>)
    return (
      <div>
        {memories}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   }
}

// export default connect(mapStateToProps, actionCreators)(MemoriesList)
