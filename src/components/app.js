import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { local } from 'store2';
import Editor from './editor';
import Viewer from './viewer';

const storedSizeViewerPane = local.get('size_viewer_pane');

export default class App extends Component {
  render() {

    const defaultSize = storedSizeViewerPane || window.innerWidth * 0.3;

    return (
      <SplitPane
         split="vertical"
         defaultSize={defaultSize}
         primary="second"
         onChange={local.set.bind(local, 'size_viewer_pane')}
      >
        <Editor />
        <Viewer />
      </SplitPane>
    );
  }
}
