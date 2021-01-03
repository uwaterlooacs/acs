import type { VOTING_STAGE } from '@acs/shared';

enum ActionTypes {
  SET_STAGE = 'Set voting stage',
}

type SetStage = {
  type: ActionTypes.SET_STAGE;
  payload: VOTING_STAGE;
};

export type Action = SetStage;

export default ActionTypes;
