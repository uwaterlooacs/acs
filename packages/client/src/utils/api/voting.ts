import { VOTING_STAGE } from '@acs/shared';
import { Method } from 'types/network';
import { makeRequest } from './request';
import { APIRoutes } from './endpoints';

export const getVotingStage = async (): Promise<VOTING_STAGE> => {
  return await makeRequest<VOTING_STAGE>(
    Method.GET,
    `${APIRoutes.VOTING}/stage`,
    'Could not get voting stage',
  );
};

export const updateVotingStage = async (
  stage: VOTING_STAGE,
  token?: string,
): Promise<void> => {
  await makeRequest<VOTING_STAGE>(
    Method.PATCH,
    `${APIRoutes.VOTING}/stage`,
    'Could not update voting stage',
    { stage },
    token,
  );
};
