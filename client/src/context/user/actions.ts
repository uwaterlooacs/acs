import { User } from "types/user";

enum ActionTypes {
  SET_USER = 'Set user',
  UNSET_USER = 'Unset user',
  SET_TOKEN = 'Set token',
  UNSET_TOKEN = 'Unset token'
}

type SetUser = {
  type: ActionTypes.SET_USER;
  payload: User;
}

type UnsetUser = {
  type: ActionTypes.UNSET_USER;
}

type SetToken = {
  type: ActionTypes.SET_TOKEN;
  payload: string;
}

type UnsetToken = {
  type: ActionTypes.UNSET_TOKEN;
}

export type Action = SetUser
| UnsetUser
| SetToken
| UnsetToken;

export default ActionTypes;
