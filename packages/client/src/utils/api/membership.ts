import type { User } from 'types/user';

import { makeRequest } from './request';
import { Method } from 'types/network';
import { APIRoutes } from './endpoints';

export const renewMembership = async (token?: string) => {
  return await makeRequest(
    Method.PATCH,
    `${APIRoutes.MEMBERSHIP}/unpaid`,
    "We couldn't renew your membership. Make sure you're logged in.",
    undefined,
    token,
  );
};

export const updateUser = async (token: string, updates: Partial<User>) => {
  return await makeRequest<User, Partial<User>>(
    Method.PATCH,
    `${APIRoutes.USER}/me`,
    "We couldn't update your info :(",
    updates,
    token,
  );
};

export const getMembershipStatus = async (emailOrWatIAMUserId: string) => {
  const status = await makeRequest<{ membershipStatus: string }>(
    Method.GET,
    `${APIRoutes.MEMBERSHIP}/check?emailOrWatIAMUserId=${emailOrWatIAMUserId}`,
    `Could not get membership status for ${emailOrWatIAMUserId}`,
  );
  return status.membershipStatus;
};
