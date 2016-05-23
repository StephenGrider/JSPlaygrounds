import _ from 'lodash';
import React, { Component } from 'react';
import { transform } from 'babel-standalone';
import esprima from 'esprima';

window.esprima = esprima;

class Viewer extends Component {
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  execute(code) {
    // let wrappedCode = `(function() {
    //   return (${code});
    // })()`;
    // const transformed = transform(code, { presets: ['es2015'] }).code;

    // return eval(transformed.replace('"use strict";', ''));
    return eval(code);
  }

  results(code) {
    const fragments = _.without(code.split('\n'), '');

    try {
      this.execute(code);
      const results = _.map(fragments, (fragment, index) => {
        try {
          const group = _.take(fragments, index + 1).join('');
          const result = this.prettyPrint(this.execute(group));
          return { code: group, result };
        } catch (e) {

        }
      });

      return _.chain(results)
        .compact()
        .without('use strict')
        .map(this.renderResult.bind(this))
        .value();
    } catch (e) {
      return e.toString();
    }
  }

  prettyPrint(result) {
    if (_.isFunction(result) && result.name) {
      return <i>Class {result.name}</i>;
    } else if (_.isBoolean(result)) {
      return result ? 'True' : 'False';
    } else if (_.isObject(result)) {
      return JSON.stringify(result);
    }

    return result;
  }

  renderResult({ code, result}) {
    return <div key={code}>{result}</div>
  }

  render() {
    return (
      <div className="viewer col-xs-5">
        {_.memoize(() => this.results(this.props.code))()}
      </div>
    );
  }
}

export default Viewer;
