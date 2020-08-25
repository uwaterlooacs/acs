import express from 'express';

import type { Request, Response } from 'express';

import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import routeValidator from './routeValidator';
import VotingModel from '../../models/voting';

const router = express.Router();

// update voting stage (requires admin privileges)
router.patch(
  '/stage',
  auth({ isAdmin: true }),
  routeValidator('/stage'),
  validate,
  async (req: Request, res: Response) => {
    const votingDoc = await VotingModel.getVotingDoc();
    votingDoc.stage = req.body.stage;
    votingDoc.save();
    res.status(204).send();
  },
);

export default router;
