import express from 'express';

import type { Request, Response, NextFunction } from 'express';

import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import UserModel from '../../models/User';
import PositionModel from '../../models/Position';
import routeValidator from './routeValidator';
import { LOCAL_ROUTES } from './types';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const positions = await PositionModel.find();
    res.send(positions);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/create',
  auth({ isAdmin: true }),
  routeValidator(LOCAL_ROUTES.CREATE_POSITION),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const title = String(req.body.title);
      const description = String(req.body.description);
      const isOpen = Boolean(req.body.isOpen);
      const occupantId = String(req.body.occupant);

      const occupant = await UserModel.findById(occupantId);

      const position = await PositionModel.create({
        title,
        description,
        isOpen,
        occupant: occupant ? occupant._id : undefined,
      });

      res.status(201).send(position);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/update',
  auth({ isAdmin: true }),
  routeValidator(LOCAL_ROUTES.UPDATE_POSITION),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const position = await PositionModel.findById(String(req.body.id));
      if (!position) {
        throw new Error('Could not find position with that id');
      }

      const title = String(req.body.title);
      const description = String(req.body.description);
      const isOpen = Boolean(req.body.isOpen);
      const occupantId = String(req.body.occupant);

      const occupant = await UserModel.findById(occupantId);

      position.title = title;
      position.description = description;
      position.isOpen = isOpen;

      if (occupant) {
        position.occupant = occupant._id;
      }

      await position.save();

      res.status(201).send(position);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/delete',
  auth({ isAdmin: true }),
  routeValidator(LOCAL_ROUTES.DELETE_POSITION),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PositionModel.findByIdAndDelete(String(req.body.id));
      res.send();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
