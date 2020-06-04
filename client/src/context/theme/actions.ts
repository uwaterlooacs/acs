import { NamedTheme } from "types/theme";

enum ActionTypes {
  SET_THEME = 'Set theme'
}

type SetTheme = {
  type: ActionTypes.SET_THEME;
  payload: NamedTheme;
}

export type Action = SetTheme;

export default ActionTypes;
