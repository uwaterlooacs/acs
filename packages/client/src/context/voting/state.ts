import { createContext } from 'react';
import { VOTING_STAGE } from '@acs/shared';

export type State = {
  stage: VOTING_STAGE;
  setStage: (stage: VOTING_STAGE) => void;
};

export const initialState: State = {
  stage: VOTING_STAGE.Closed,
  setStage: (stage: VOTING_STAGE): void => {
    void stage;
  },
};

export const VotingContext = createContext(initialState);
