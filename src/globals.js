import _ from 'lodash';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';

_.extend(window, { _, React, Component, Redux: { createStore, combineReducers } });
