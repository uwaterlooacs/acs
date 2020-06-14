import { MailingListRequest } from 'types/mailingList';
import { AuthResponse, Method } from 'types/network';
import { makeRequest } from 'utils/network/request';
import { APIRoutes } from 'utils/network/endpoints';
import * as M from 'utils/network/errorMessages';

export const mailingListSubmit = async (data: MailingListRequest) => {
  return await makeRequest<AuthResponse, MailingListRequest>(
    Method.POST,
    APIRoutes.MAILING_LIST,
    M.MAILING_LIST,
    data,
  );
};
