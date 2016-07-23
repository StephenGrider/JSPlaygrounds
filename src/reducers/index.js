import { combineReducers } from 'redux';
import code from 'reducers/code_reducer';
import theme from 'reducers/theme_reducer';

const rootReducer = combineReducers({
  code,
  theme
});

export default rootReducer;
