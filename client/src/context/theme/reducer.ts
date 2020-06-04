import { Action } from './actions';
import { initialState } from 'context/theme/state';
import ActionTypes from 'context/theme/actions';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
}