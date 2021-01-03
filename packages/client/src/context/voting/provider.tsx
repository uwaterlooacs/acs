import type { VOTING_STAGE } from '@acs/shared';

import React, { useReducer } from 'react';
import { VotingContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';

const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setStage = (stage: VOTING_STAGE) => {
    dispatch({ type: ActionTypes.SET_STAGE, payload: stage });
  };

  return (
    <VotingContext.Provider
      value={{
        ...state,
        setStage,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export default Provider;
