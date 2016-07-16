import {
  DID_UPDATE_CODE
} from 'actions/types';

export function updateCode(code) {
  return {
    type: DID_UPDATE_CODE,
    payload: code
  };
}
