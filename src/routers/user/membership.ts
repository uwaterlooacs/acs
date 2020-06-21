import express, { Request, Response, NextFunction } from 'express';
import validate from '../../middleware/validate';
import routeValidator from './routeValidator';
import User from '../../models/user';
import { MEMBERSHIP_STATUS } from '../../types/user';
import createHttpError from 'http-errors';
import validator from 'validator';

const router = express.Router();

// update user's membership status
router.patch(
  '/',
  routeValidator('/membership'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.query.id);
      if (!user) {
        throw createHttpError(404, 'Cannot find user with that id');
      }
      const membershipStatus = req.body.membershipStatus;
      if (!Object.values(MEMBERSHIP_STATUS).includes(membershipStatus)) {
        throw createHttpError(422, 'invalid membership status');
      }
      Object.assign(user, { membershipStatus });
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
      const user = await User.findOne(
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
