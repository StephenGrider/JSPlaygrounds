import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { themesType } from 'themes';

import Editor from './editor';
import Viewer from './viewer';
import Header from './Header';

const App = ({ theme }) => {
  const width = window.innerHeight;

  return (
    <div className={`CodeMirror cm-s-${theme} theme-${themesType[theme]} App`}>
      <Header />
      <div className="App__master">
        <SplitPane split="vertical" defaultSize={width}>
          <Editor />
          <Viewer />
        </SplitPane>
      </div>
    </div>
  );
}

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(App);
