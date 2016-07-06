import React, { Component } from 'react';
import { connect } from 'react-redux';
import parseExpressions from '../selectors/parse_expressions';

class ErrorConsole extends Component {
  render() {
    return (
      <div>
        <h1>error</h1>
        {this.props.error}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let error;
  try {
    parseExpressions(state)
  } catch(e) {
    error = error.toString();
  }

  return { error }
}

export default connect(mapStateToProps)(ErrorConsole);
