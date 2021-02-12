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

export const createPosition = async (
  position: Partial<PositionDoc>,
  token?: string,
): Promise<PositionDoc> => {
  return await makeRequest(
    Method.POST,
    APIRoutes.POSITION,
    'Could not create position',
    { ...position },
    token,
  );
};

export const updatePosition = async (
  position: Partial<PositionDoc>,
  token?: string,
): Promise<void> => {
  await makeRequest(
    Method.PATCH,
    APIRoutes.POSITION,
    'Could not update position',
    { ...position },
    token,
  );
};

export const deletePosition = async (
  id: string,
  token?: string,
): Promise<void> => {
  await makeRequest(
    Method.DELETE,
    `${APIRoutes.POSITION}?id=${id}`,
    'Could not delete position',
    undefined,
    token,
  );
};
