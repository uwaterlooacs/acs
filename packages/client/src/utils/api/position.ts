import type { PositionDoc } from '@acs/shared';

import { Method } from 'types/network';
import { APIRoutes } from './endpoints';
import { makeRequest } from './request';

export const getPositions = async (): Promise<PositionDoc[]> => {
  return await makeRequest(
    Method.GET,
    APIRoutes.POSITION,
    'Could not fetch positions',
  );
};
