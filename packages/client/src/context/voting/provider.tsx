import type { VOTING_STAGE } from '@acs/shared';

import React, { useEffect, useReducer } from 'react';
import { VotingContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';
import { makeRequest } from 'utils/api/request';
import { Method } from 'types/network';
import { APIRoutes } from 'utils/api/endpoints';

const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setStage = (payload: VOTING_STAGE) => {
    dispatch({ type: ActionTypes.SET_VOTING_STAGE, payload });
  };

  useEffect(() => {
    const fetchVotingStage = async () => {
      const stage = await makeRequest<VOTING_STAGE>(
        Method.GET,
        `${APIRoutes.VOTING}/stage`,
        'Could not get voting stage',
      );
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
