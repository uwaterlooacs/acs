import { MailingListRequestBody } from './types';

export const isMailingListRequestBody = (
  mailingListReqBody: unknown,
): mailingListReqBody is MailingListRequestBody => {
  const {
    email,
    interestedEvents,
    otherFeedback,
  } = mailingListReqBody as MailingListRequestBody;

  if (!email || typeof email !== 'string') return false;
  if (otherFeedback === undefined || typeof email !== 'string') return false;
  if (!interestedEvents || !Array.isArray(interestedEvents)) return false;
  for (const interestedEvent of interestedEvents) {
    if (!interestedEvent || typeof interestedEvent !== 'string') return false;
  }

  return true;
};
