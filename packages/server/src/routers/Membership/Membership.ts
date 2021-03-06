import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../types/request';

import express from 'express';
import createHttpError from 'http-errors';
import validator from 'validator';
import { MEMBERSHIP_STATUS } from '@acs/shared';
import UserModel from '../../models/User';
import validate from '../../middleware/validate';
import routeValidator from './routeValidator';
import auth from '../../middleware/auth';

const router = express.Router();

// update user's membership status
router.patch(
  '/unpaid',
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw createHttpError(401, 'Must authenticate');
      }
      if (req.user.membershipStatus !== MEMBERSHIP_STATUS.PAID) {
        req.user.membershipStatus = MEMBERSHIP_STATUS.UNPAID;
      }
      await req.user.save();
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

// update user's membership status
router.patch(
  '/',
  routeValidator('/membership'),
  validate,
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.isAdmin) {
        throw createHttpError(
          401,
          'Must be an admin to update membership status',
        );
      }

      const user = await UserModel.findById(req.query.id);
      if (!user) {
        throw createHttpError(404, 'Cannot find user with that id');
      }

      user.membershipStatus = req.body.membershipStatus;
      await user.save();

      res.send();
    } catch (err) {
      next(err);
    }
  },
);

// check membership by email or watiam user id
router.get(
  '/check',
  routeValidator('/membership/check'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailOrWatIAMUserId = req.query.emailOrWatIAMUserId as string;

      const isEmail = validator.isEmail(emailOrWatIAMUserId);
      const user = await UserModel.findOne(
        { [isEmail ? 'email' : 'watIAMUserId']: emailOrWatIAMUserId },
        'membershipStatus',
      );

      if (!user) {
        throw createHttpError(
          404,
          `${
            isEmail ? 'Email' : 'WatIAM user id'
          } provided does not match an existing user.`,
        );
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
