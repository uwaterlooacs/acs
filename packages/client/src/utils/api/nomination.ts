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

export const createNomination = async (
  nomination: Partial<NominationDoc>,
  token?: string,
): Promise<NominationDoc> => {
  return await makeRequest<NominationDoc>(
    Method.POST,
    APIRoutes.NOMINATION,
    'Could not create nomination',
    { ...nomination },
    token,
  );
};

export const deleteNomination = async (
  id: string,
  token?: string,
): Promise<void> => {
  await makeRequest(
    Method.DELETE,
    `${APIRoutes.NOMINATION}?id=${id}`,
    'Could not delete nomination',
    undefined,
    token,
  );
};

export const secondNomination = async (
  id: string,
  token?: string,
): Promise<void> => {
  await makeRequest(
    Method.PATCH,
    `${APIRoutes.NOMINATION}/second?id=${id}`,
    'Could not second nomination',
    {},
    token,
  );
};

export const voteNomination = async (
  id: string,
  token?: string,
): Promise<void> => {
  await makeRequest(
    Method.PATCH,
    `${APIRoutes.NOMINATION}/vote?id=${id}`,
    'Could not vote for nomination',
    {},
    token,
  );
};
