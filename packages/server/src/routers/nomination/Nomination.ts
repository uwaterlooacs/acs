import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../types/AuthenticatedRequest';

import express from 'express';
import NominationModel from '../../models/Nomination/Nomination';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import getValidations from './routeValidator';
import { LOCAL_ROUTES } from './types';
import { getNominationsByPosition } from '../Voting/utils';

const router = express.Router();

router.post(
  '/',
  getValidations(LOCAL_ROUTES.CREATE_NOMINATION),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (
        await NominationModel.exists({
          $and: [
            { position: req.body.position },
            { candidate: req.body.candidate },
          ],
        })
      ) {
        throw new Error('Nomination already exists');
      }

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
  getValidations(LOCAL_ROUTES.SECOND_NOMINEE),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = await NominationModel.findById(
        req.query.nomination as string,
      );

      if (!nomination) throw new Error('Could not find nomination');

      nomination.seconds.addToSet(req.user?._id);
      await nomination.save();

      res.send();
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/decline',
  getValidations(LOCAL_ROUTES.DECLINE_NOMINATION),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      await NominationModel.findByIdAndDelete(req.query.nomination as string);
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/vote',
  getValidations(LOCAL_ROUTES.VOTE_NOMINEE),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = await NominationModel.findById(
        req.query.nomination as string,
      );

      if (!nomination) throw new Error('Could not find nomination');

      nomination.votes.addToSet(req.user?._id);
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
