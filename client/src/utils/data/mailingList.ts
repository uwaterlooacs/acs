import { MailingListResponse } from 'types/mailingList';
import { AuthResponse, Method } from 'types/network';
import { makeRequest } from 'utils/network/request';
import { APIRoutes } from 'utils/network/endpoints';
import * as M from 'utils/network/errorMessages';

export const mailingListSubmit = async (data: MailingListResponse) => {
  return await makeRequest<AuthResponse, MailingListResponse>(
    Method.POST,
    APIRoutes.MAILING_LIST,
    M.MAILING_LIST,
    data,
  );
};
