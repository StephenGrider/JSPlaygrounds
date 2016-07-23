import _ from 'lodash';
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import { updateCode } from 'actions';
import { connect } from 'react-redux';

const Editor = ({ code, theme, onCodeChange }) => {
  return (
    <div>
      <CodeMirror
        value={code}
        onChange={onCodeChange}
        options={{ theme, mode: 'jsx', lineNumbers: true, tabSize: 2 }} />
    </div>
  );
}

function mapStateToProps({ code, theme }) {
  return { code, theme };
}

const mapDispatchToProps = (dispatch) => ({
  onCodeChange: (code) => dispatch(updateCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
