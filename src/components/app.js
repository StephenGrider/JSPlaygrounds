import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './editor';
import Viewer from './viewer';
import ErrorConsole from './error_console';

export default class App extends Component {
  render() {
    const width = window.innerHeight / 2;

    return (
      <SplitPane split="vertical" defaultSize={width}>
        <Editor />
        <div>
          <Viewer />
          {/*<ErrorConsole />*/}
        </div>
      </SplitPane>
    );
  }
}
