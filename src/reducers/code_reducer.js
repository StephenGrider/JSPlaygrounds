import { DID_UPDATE_CODE } from 'actions/types';

const INITIAL_STATE = '';

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DID_UPDATE_CODE:
    return action.payload
  default:
    return state;
  }
}
