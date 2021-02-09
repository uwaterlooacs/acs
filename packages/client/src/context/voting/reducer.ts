import type { Action } from './actions';
import type { State } from './state';

import { initialState } from './state';
import ActionTypes from './actions';

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_VOTING_STAGE:
      return {
        ...state,
        stage: action.payload,
      };
    default:
      return state;
  }
};
