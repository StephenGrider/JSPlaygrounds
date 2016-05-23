import React, { Component } from 'react';
import Editor from './editor';
import Viewer from './viewer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { code: '' };
  }

  onEditorChange(code) {
    this.setState({ code });
  }

  render() {
    return (
      <div>
        <Editor onChange={this.onEditorChange.bind(this)} />
        <Viewer code={this.state.code} />
      </div>
    );
  }
}
