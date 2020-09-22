import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../types/network';

import express from 'express';
import { PositionModel } from '@acs/shared';
import auth from '../../middleware/auth';
import positions from '../../data/positions';

const router = express.Router();

// create positions if they don't exist
router.post(
  '/positions',
  auth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if ((await PositionModel.find({})).length !== 0)
        throw new Error('Positions already exist');
      await PositionModel.create(
        positions.map((position) => {
          return {
            ...position,
            isOpen: true,
            occupant: req.user?._id,
          };
        }),
      );
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
