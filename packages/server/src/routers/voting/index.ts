import express from 'express';

import type { Request, Response } from 'express';

import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import routeValidator from './routeValidator';
import { VotingModel } from '@acs/shared';

const router = express.Router();

// update voting stage (requires admin privileges)
router.patch(
  '/stage',
  auth({ isAdmin: true }),
  routeValidator('/stage'),
  validate,
  async (req: Request, res: Response) => {
    const votingDoc = await VotingModel.getDoc();
    votingDoc.stage = req.body.stage;
    votingDoc.save();
    res.status(204).send();
  },
);

export default router;
