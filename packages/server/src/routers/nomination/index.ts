import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../types/network';

import express from 'express';
import NominationModel from '../../models/nomination';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import getValidations from './routeValidator';
import { LocalRoutes } from './types';
import { getNominationsByPosition } from '../voting/utils';

const router = express.Router();

router.post(
  '/',
  getValidations(LocalRoutes.CREATE_NOMINATION),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (
        await NominationModel.exists({
          position: req.body.position,
          candidate: req.body.candidate,
        })
      )
        throw new Error('Nomination already exists');
      const nomination = new NominationModel({ ...req.body });
      await nomination.save();
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/second',
  getValidations(LocalRoutes.SECOND_NOMINEE),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = await NominationModel.findOne({
        position: req.query.position as string,
        candidate: req.query.candidate as string,
      });
      if (!nomination) throw new Error('Could not find nomination');

      const myId = req.user?._id;
      nomination.seconds.addToSet(myId);
      await nomination.save();
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/vote',
  getValidations(LocalRoutes.VOTE_NOMINEE),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = await NominationModel.findOne({
        position: req.query.position as string,
        candidate: req.query.candidate as string,
      });
      if (!nomination) throw new Error('Could not find nomination');

      const myId = req.user?._id;
      nomination.votes.addToSet(myId);
      await nomination.save();
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/',
  auth(),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      res.send(getNominationsByPosition(await NominationModel.find()));
    } catch (err) {
      next(err);
    }
  },
);

export default router;
