import _ from 'lodash';
import React, { Component } from 'react';
import { transform } from 'babel-standalone';
import esprima from 'esprima';

window.React = React;
window.Component = Component;
window.esprima = esprima;

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
    const transformedCode = JSXTransformer.transform(code).code;
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

    console.log(exp);
    return exp;
  }

  evaluateExpressions(expressions) {
    const exp = _.map(expressions, expression => {
      const result = eval(expression);

      if (result && result.type) {
        return result;
      } else if (_.isFunction(result) && result.name) {
        return <i>Function {result.name}</i>;
      } else if (_.isBoolean(result)) {
        return result ? 'True' : 'False';
      } else if (_.isObject(result)) {
        return JSON.stringify(result);
      }

      return result;
    });

    return exp.map(e => <div>{e}</div>)
  }

  renderExpressions(code) {
    return this.evaluateExpressions(this.buildExpressions(code));
  }

  render() {
    return (
      <div className="viewer col-xs-5">
        {this.renderExpressions(this.props.code)}
      </div>
    );
  }
}

export default Viewer;
