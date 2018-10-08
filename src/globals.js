import _ from 'lodash';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
const tf = require('@tensorflow/tfjs');

_.extend(window, {
  _,
  React,
  Component,
  tf,
  Redux: { createStore, combineReducers }
});
