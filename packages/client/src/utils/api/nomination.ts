import type { NominationDoc } from '@acs/shared';

import { makeRequest } from './request';
import { Method } from 'types/network';
import { APIRoutes } from './endpoints';

export const getNominations = async (
  id: string,
  token?: string,
): Promise<NominationDoc[]> => {
  return await makeRequest(
    Method.GET,
    `${APIRoutes.NOMINATION}?id=${id}`,
    'Could not get nominations',
    undefined,
    token,
  );
};
