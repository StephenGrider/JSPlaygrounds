import {
  DID_UPDATE_CODE
} from './types';

export function updateCode(code) {
  console.clear();

  return {
    type: DID_UPDATE_CODE,
    payload: code
  };
}
