import type { NominationDoc } from '@acs/shared';
import type { User } from 'types/user';
import { VOTING_STAGE } from '@acs/shared';

export const hasCompletedAction = (
  nomination: NominationDoc,
  stage: VOTING_STAGE,
  user?: User,
): boolean => {
  switch (stage) {
    case VOTING_STAGE.Nomination:
      return !!nomination.seconds.find((id) => String(id) === user?._id);
    case VOTING_STAGE.Vote:
      return !!nomination.votes.find((id) => String(id) === user?._id);
    default:
      return false;
  }
};
