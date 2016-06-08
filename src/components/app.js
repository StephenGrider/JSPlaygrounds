import React, { Component } from 'react';
import Editor from './editor';
import Viewer from './viewer';
import SplitPane from 'react-split-pane';

export default class App extends Component {
  render() {
    const defaultWidth = document.body.clientWidth / 2;
    return (
      <SplitPane split="vertical" defaultSize={defaultWidth}>
        <Editor />
        <Viewer />
      </SplitPane>
    );
  }
}
