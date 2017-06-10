import React from 'react';
import {connect} from 'react-redux';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        {this.props.avatarUrl !== undefined ? <img src={this.props.avatarUrl}/> : ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.get("avatarUrl")
   }
}

export default connect(mapStateToProps)(Avatar)
