import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { transform } from 'babel-standalone';
import esprima from 'esprima';

window.React = React;
window.Component = Component;

const OPEN_DELIMITERS = [ '(', '{', '[', '`' ];
const CLOSE_DELIMITERS = [ ')', '}', ']', '`' ];
const DELIMITER_MAP = {
  ')': '(',
  '}': '{',
  ']': '[',
  '`': '`'
};

class Viewer extends Component {
  constructor(props) {
    super(props);

    // this.renderExpressions = _.memoize(code => this._renderExpressions(code, []));
  }

  lineHasMoreDelimiters({ column }, lineContents) {
    return _.intersection(_.takeRight(lineContents, lineContents.length - column), OPEN_DELIMITERS).length;
  }

  buildExpressions(code) {
    const transformedCode = transform(code, { presets: ['react']}).code;
    const codeByLine = transformedCode.split('\n');
    const tokenized = esprima.tokenize(transformedCode, { loc: true });

    const parens = { '(': 0, '{': 0, '[': 0 };
    let wasOpen = false;
    const exp = _.reduce(tokenized, (expressions, { value, loc: { end } }, index) => {
      const lineNumber = end.line;
      const lineContents = codeByLine[lineNumber - 1];
      const lineHasMoreDelimiters = this.lineHasMoreDelimiters(end, lineContents);
      const endOfLine = end.column === lineContents.length;

      if (expressions[lineNumber]) { return expressions; }

      if (OPEN_DELIMITERS.includes(value)) {
        parens[value] += 1;
        wasOpen = true;
      }

      if (CLOSE_DELIMITERS.includes(value)) {
        parens[DELIMITER_MAP[value]] -= 1;
      }

      if (!lineHasMoreDelimiters && wasOpen && _.every(parens, count => count === 0)) {
        wasOpen = false;
        expressions[lineNumber] = _.take(codeByLine, lineNumber).join('\n');

        return expressions;
      }

      if (!lineHasMoreDelimiters && _.every(parens, count => count === 0)) {
        expressions[lineNumber] = _.take(codeByLine, lineNumber).join('\n');

        return expressions;
      }

      return expressions;
    }, {});

    return exp;
  }

  evaluateExpressions(expressions) {
    const formattedExpressions = _.mapValues(expressions, expression => {
      const result = eval(expression);

      if (result && result.type) {
        return result;
      } else if (_.isFunction(result) && result.name) {
        return <i>Function {result.name}</i>;
      } else if (_.isBoolean(result)) {
        return result ? 'True' : 'False';
      } else if (_.isObject(result) || _.isArray(result)) {
        return JSON.stringify(result);
      }

      return result;
    });

    return _.map(formattedExpressions, (expression, line) =>
      <div>{expression}</div>
    );
  }

  renderExpressions(code) {
    return this.evaluateExpressions(this.buildExpressions(code));
  }

  render() {
    return (
      <div className="viewer">
        {this.renderExpressions(this.props.code)}
      </div>
    );
  }
}

function mapStateToProps({ code }){
  return { code };
}

export default connect(mapStateToProps)(Viewer);
