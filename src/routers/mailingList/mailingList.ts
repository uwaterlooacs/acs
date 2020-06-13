import express, { Request, Response } from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { isMailingListRequestBody } from './utils';
import { DEFAULT_EVENT_RESPONSES } from './constant';
import GoogleCreds from '../../config/acs-web-5aaaf-768e669e2d39.json';

const doc = new GoogleSpreadsheet(
  '16PEbh4LFsb1klDX-W6kp47_p9acEKVIWNBz-TTDXcDc',
);

const router = express.Router();

// sign up
router.post('/api/mailingList', async (req: Request, res: Response) => {
  if (!isMailingListRequestBody(req.body)) {
    return res.status(400).end();
  }

  await doc.useServiceAccountAuth(GoogleCreds);
  await doc.loadInfo();
  const responseSheet = doc.sheetsById['0'];
  await responseSheet.loadHeaderRow();

  const { email, interestedEvents, otherFeedback } = req.body;
  const eventsResponses = DEFAULT_EVENT_RESPONSES;
  for (const eventName of interestedEvents) {
    eventsResponses[eventName] = true;
  }
  const newRow = {
    Email: email,
    'Other Feedback': otherFeedback,
    ...eventsResponses,
  };

  await responseSheet.addRow(newRow);
  return res.send();
});

export default router;
