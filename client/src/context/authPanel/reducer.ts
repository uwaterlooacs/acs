import { Action } from './actions';
import { initialState } from 'context/authPanel/state';
import ActionTypes from 'context/authPanel/actions';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case ActionTypes.SET_OPTION:
      return {
        ...state,
        option: action.payload,
      };
    default:
      return state;
  }
};
