import type { Reducer } from 'react';
import type { Action } from './actions';
import type { VotingState } from './state';

import ActionTypes from './actions';
import { initialState } from './state';

const reducer: Reducer<VotingState, Action> = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.SET_STAGE:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
