import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import parseExpressions from 'selectors/parse_expressions';
import SplitPane from 'react-split-pane';

class Viewer extends Component {
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

    const lineNumberLength = _.reduce(
      _.keys(formattedExpressions),
      (len, line) => line.length > len ? line.length : len,
      0
    );

    return _.map(formattedExpressions, (expression, line) => {
      const lineString = _.padStart(line.toString(), lineNumberLength, '\u00A0');
      if(expression){
        return(
          <div className="result__line">
            <div className="result___line-number">{lineString}</div>
            <div className="result___expression">{expression}</div>
          </div>
        );
      }
      return ;
    });
  }

  renderExpressions(code) {
    return this.evaluateExpressions(this.props.expressions);
  }

  render() {
    const defaultHeight = window.innerHeight / 1.3;

    return (
      <SplitPane split="horizontal" defaultSize={defaultHeight} className="viewer">
        <div className="result">
          {this.renderExpressions(this.props.code)}
        </div>
        <div className="errors">
          {this.props.errors}
        </div>
      </SplitPane>
    );
  }
}

function mapStateToProps(state){
  let expressions, errors;

  try {
    expressions = parseExpressions(state);
  } catch (e) {
    errors = e.toString();
  }

  return { expressions, errors };
}

export default connect(mapStateToProps)(Viewer);
