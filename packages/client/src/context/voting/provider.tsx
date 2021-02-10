import type { VOTING_STAGE } from '@acs/shared';

import React, { useEffect, useReducer } from 'react';
import { VotingContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';
import { getVotingStage } from 'utils/api/voting';

const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setStage = (payload: VOTING_STAGE) => {
    dispatch({ type: ActionTypes.SET_VOTING_STAGE, payload });
  };

  useEffect(() => {
    const fetchVotingStage = async () => {
      const stage = await getVotingStage();
      if (stage !== state.stage) {
        setStage(stage);
      }
    };
    fetchVotingStage();
  }, [state]);

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
