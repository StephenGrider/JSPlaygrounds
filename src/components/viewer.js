import _ from 'lodash';
import React, { Component } from 'react';
import { transform } from 'babel-standalone';
import CreateFragment from 'react-addons-create-fragment';

window.React = React;
window.Component = React.Component;

class Viewer extends Component {
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  execute(code) {
    let wrappedCode = `(function() {
      return (${code});
    })()`;
    const transformed = transform(code, { presets: ['react', 'es2015'] }).code;
    return eval(transformed.replace("'use strict';", ''));
  }

  renderResult(Result) {
    if (Result.prototype && Result.prototype.render) {
      return <div><Result /></div>
    } else {
      return <div>{Result}</div>
    }
  }

  results(code) {
    const fragments = _.without(code.split('\n'), '');

    try {
      this.execute(code);
      const results = _.map(fragments, (fragment, index) => {
        try {
          const group = _.take(fragments, index + 1).join('');
          return this.execute(group);
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

  render() {
    return (
      <div>
        {_.memoize(() => this.results(this.props.code))()}
      </div>
    );
  }
}

export default Viewer;
