import { MailingListRequest } from 'types/mailingList';
import { AuthResponse, Method } from 'types/network';
import { makeRequest } from 'utils/api/request';
import { APIRoutes } from 'utils/api/endpoints';
import * as M from 'utils/api/errorMessages';

export const mailingListSubmit = async (data: MailingListRequest) => {
  return await makeRequest<AuthResponse, MailingListRequest>(
    Method.POST,
    APIRoutes.MAILING_LIST,
    M.MAILING_LIST,
    data,
  );
};
