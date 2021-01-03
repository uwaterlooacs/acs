import { createContext } from 'react';
import { VOTING_STAGE } from '@acs/shared';

export type VotingState = {
  stage: VOTING_STAGE;
  setStage: (stage: VOTING_STAGE) => void;
};

export const initialState: VotingState = {
  stage: VOTING_STAGE.Closed,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStage: (_stage: VOTING_STAGE): void => {},
};

export const VotingContext = createContext(initialState);
