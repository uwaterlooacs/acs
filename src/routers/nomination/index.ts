import type { AuthenticatedRequest } from '../../types/network';

import express, { Response, NextFunction } from 'express';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import NominationModel from '../../models/nomination';
import getValidations from './validations';
import { LocalRoutes } from './types';

const router = express.Router();

router.post(
  '/',
  getValidations(LocalRoutes.CREATE_NOMINATION),
  validate,
  auth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = new NominationModel({ ...req.body });
      await nomination.save();
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
