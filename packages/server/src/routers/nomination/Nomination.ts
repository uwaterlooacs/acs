import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest, UploadRequest } from '../../types/Request';

import express from 'express';
import NominationModel from '../../models/Nomination/Nomination';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import { uploadFile } from '../../utils/aws';
import getValidations from './routeValidator';
import { LOCAL_ROUTES } from './types';

const router = express.Router();

router.post(
  '/',
  auth(),
  getValidations(LOCAL_ROUTES.CREATE_NOMINATION),
  validate,
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
  auth(),
  getValidations(LOCAL_ROUTES.SECOND_NOMINEE),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = await NominationModel.findById(req.query.id as string);

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
  auth(),
  getValidations(LOCAL_ROUTES.DECLINE_NOMINATION),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      await NominationModel.findByIdAndDelete(req.query.id as string);
      res.send();
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/vote',
  auth(),
  getValidations(LOCAL_ROUTES.VOTE_NOMINEE),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nomination = await NominationModel.findById(req.query.id as string);

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
  getValidations(LOCAL_ROUTES.GET_NOMINATIONS),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const nominations = await NominationModel.find({
        position: req.query.id as string,
      });
      res.send(nominations);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/upload',
  auth(),
  async (req: UploadRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.files) {
        throw new Error('Could not get files on request');
      }
      if (!req.user) {
        throw new Error('Could not get user on request');
      }

      const nomineeName = `${req.user.firstName}-${req.user.lastName}`;
      const fileExtension = req.files.file.name.match(
        /\.([0-9a-z]+)(?:[?#]|$)/i,
      );

      uploadFile(`${nomineeName}${fileExtension}`, req.files.file.data);

      res.send();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
