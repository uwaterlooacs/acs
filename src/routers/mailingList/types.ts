import { DEFAULT_EVENT_RESPONSES } from './constant';

export type MailingListRequestBody = {
  email: string;
  interestedEvents: (keyof typeof DEFAULT_EVENT_RESPONSES)[];
  otherFeedback: string;
};
