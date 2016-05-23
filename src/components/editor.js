import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

class Editor extends Component {
  onChange(code) {
    this.props.onChange(code);
  }

  render() {
    return (
      <div>
        <CodeMirror
          value={this.props.code}
          onChange={this.onChange.bind(this)}
          options={{ mode: 'javascript' }} />
      </div>
    );
  }
}

export default Editor;
