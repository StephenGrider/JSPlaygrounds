import { CHANGE_THEME } from 'actions/types';

const INITIAL_STATE = 'default';

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload
    default:
      return state;
  }
}
