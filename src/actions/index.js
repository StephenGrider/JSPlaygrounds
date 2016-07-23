import {
  DID_UPDATE_CODE,
  CHANGE_THEME
} from 'actions/types';

export function updateCode(code) {
  //console.clear();

  return {
    type: DID_UPDATE_CODE,
    payload: code
  };
}

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme
});
