import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './editor';
import Viewer from './viewer';

export default class App extends Component {
  render() {
    const width = window.innerHeight;

    return (
      <SplitPane split="vertical" defaultSize={width}>
        <Editor />
        <Viewer />
      </SplitPane>
    );
  }
}
