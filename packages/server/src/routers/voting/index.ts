import express from 'express';
import { VOTING_STAGE } from '@acs/shared';

import type { Request, Response, NextFunction } from 'express';

import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import routeValidator from './routeValidator';
import VotingModel from '../../models/voting';
import { finalizeResults } from './utils';

const router = express.Router();

// get current voting stage
router.get(
  '/stage',
  auth({ isAdmin: true }),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send(await VotingModel.getDoc());
    } catch (err) {
      next(err);
    }
  },
);

// update voting stage (requires admin privileges)
router.patch(
  '/stage',
  auth({ isAdmin: true }),
  routeValidator('/stage'),
  validate,
  async (req: Request, res: Response) => {
    const votingDoc = await VotingModel.getDoc();
    const newStage: VOTING_STAGE = req.body.stage;
    const prevStage: VOTING_STAGE = votingDoc.stage;

    if (prevStage === VOTING_STAGE.Vote && newStage === VOTING_STAGE.Results) {
      await finalizeResults();
    }

    votingDoc.stage = newStage;
    votingDoc.save();

    res.status(204).send();
  },
);

export default router;
