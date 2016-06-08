import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import * as actions from 'actions';
import { connect } from 'react-redux';

class Editor extends Component {
  onCodeChange(code) {
    this.props.updateCode(code);
  }

  render() {
    return (
      <div>
        <CodeMirror
          value={this.props.code}
          onChange={this.onCodeChange.bind(this)}
          options={{ mode: 'javascript' }} />
      </div>
    );
  }
}

function mapStateToProps({code}) {
  return { code };
}

export default connect(mapStateToProps, actions)(Editor);
