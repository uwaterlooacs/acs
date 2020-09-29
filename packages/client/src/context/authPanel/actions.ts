import { AuthPanelOption } from 'types/auth';

enum ActionTypes {
  SET_IS_OPEN = 'Open / Close the panel',
  SET_OPTION = 'Set panel option',
}

type SetIsOpen = {
  type: ActionTypes.SET_IS_OPEN;
  payload: boolean;
};

type SetOption = {
  type: ActionTypes.SET_OPTION;
  payload: AuthPanelOption;
};

export type Action = SetIsOpen | SetOption;

export default ActionTypes;
