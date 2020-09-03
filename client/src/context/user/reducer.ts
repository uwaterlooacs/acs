import { initialState } from 'context/user/state';
import ActionTypes, { Action } from 'context/user/actions';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.UNSET_USER:
      return {
        ...state,
        user: undefined,
      };
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionTypes.UNSET_TOKEN:
      return {
        ...state,
        token: initialState.token,
      };
    default:
      return state;
  }
};
