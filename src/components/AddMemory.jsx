import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';

export default class AddMemory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="add-memory-container">
        <div className="add-memory-title-row">
          <h3>Add Memory</h3>
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
            <label>Titel:</label>
          </div>
          <div className="add-memory-column-input">
            <input type="text"/>
          </div>
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
            <label>Location:</label>
          </div>
          <div className="add-memory-column-input">
            <input type="text"/>
          </div>
        </div>

        <div className="add-memory-row">
          <div className="add-memory-column-label">
            <label>Description:</label>
          </div>
          <div className="add-memory-column-input">
            <textarea/>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.get("user") }
}
