import type { AuthenticatedRequest } from '../../types/network';

import express, { Response, NextFunction } from 'express';
import auth from '../../middleware/auth';
import positions from '../../data/positions';
import PositionModel from '../../models/position';

const router = express.Router();

// create positions if they don't exist
router.post(
  '/positions',
  auth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      positions.forEach(async (p) => {
        const existingPosition = await PositionModel.find({ title: p.title });
        if (!existingPosition) {
          const position = new PositionModel({
            ...p,
            isOpen: true,
            occupant: req.user?._id,
          });
          await position.save();
        }
      });
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
