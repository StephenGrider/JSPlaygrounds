import React, { Component } from 'react'
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import Viewer from './Viewer';

export default class App extends Component {
    render() {
        const width = window.innerHeight*.5;

        return (
            <SplitPane split="vertical" defaultSize={width}>
                <Editor />
                <Viewer />
            </SplitPane>
        )
    }
}
