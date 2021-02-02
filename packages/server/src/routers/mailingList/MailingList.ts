import type { Request, Response, NextFunction } from 'express';
import type { ServiceAccountCredentials } from 'google-spreadsheet';

import express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import validate from '../../middleware/validate';
import routeValidator from './routeValidator';
import { DEFAULT_EVENT_RESPONSES } from './constant';
import { LOCAL_ROUTES, MailingListRequestBody } from './types';

let GoogleCreds: ServiceAccountCredentials = {
  client_email: '',
  private_key: '',
};

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  GoogleCreds = require('../config/acs-web-5aaaf-768e669e2d39.json');
}

const doc = new GoogleSpreadsheet(
  '16PEbh4LFsb1klDX-W6kp47_p9acEKVIWNBz-TTDXcDc',
);

const router = express.Router();

router.post(
  '/',
  routeValidator(LOCAL_ROUTES.UPDATE_SHEET),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await doc.useServiceAccountAuth(GoogleCreds);
      await doc.loadInfo();

      const responseSheet = doc.sheetsById['0'];

      const {
        email,
        interestedEvents,
        otherFeedback,
      } = req.body as MailingListRequestBody;

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
    } catch (err) {
      next(err);
    }
  },
);

export default router;
