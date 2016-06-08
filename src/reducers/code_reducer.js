import { DID_UPDATE_CODE } from 'actions/types';

export default function(state = '', action) {
  switch (action.type) {
  case DID_UPDATE_CODE:
    return action.payload
  default:
    return state;
  }
}
