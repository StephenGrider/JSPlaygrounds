import _ from 'lodash';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { transform } from 'babel-standalone';
const tf = require('@tensorflow/tfjs');

_.extend(window, {
  transform: code => transform(code, { presets: ['react'] }).code,
  _,
  React,
  Component,
  tf,
  Redux: { createStore, combineReducers }
});
