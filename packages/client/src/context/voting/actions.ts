import { VOTING_STAGE } from '@acs/shared';

enum ActionTypes {
  SET_VOTING_STAGE,
}

type SetStage = {
  type: ActionTypes.SET_VOTING_STAGE;
  payload: VOTING_STAGE;
};

export type Action = SetStage;

export default ActionTypes;
