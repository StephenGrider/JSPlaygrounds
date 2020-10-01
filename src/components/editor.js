import _ from 'lodash';
import React, { Component } from 'react'
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Editor extends Component {
    onCodeChange(code) {
        this.props.updateCode(code);
    }

    render() {
        return (
            <CodeMirror className="editor"
                value={this.props.code}
                onChange={this.onCodeChange.bind(this)}
                options={{ mode: 'jsx', lineNumbers: true, tabSize: 2 }}
            />
        )
    }
}

function mapStateToProps({ code }) {
    return { code };
}

export default connect(mapStateToProps, actions)(Editor);