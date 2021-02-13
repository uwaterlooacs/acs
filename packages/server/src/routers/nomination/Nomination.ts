import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../types/request';

import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import NominationModel from '../../models/Nomination/Nomination';
import auth from '../../middleware/auth';
import upload from '../../middleware/upload';
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
  upload.single('file'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const base = `${req.user?.firstName}-${req.user?.lastName}-${req.query.id}`;
      const inputFile = `./uploads/${base}${path.extname(
        req.file.originalname,
      )}`;
      const outputFile = `./uploads/${base}.mp4`;

      ffmpeg(inputFile)
        .output(outputFile)
        .on('end', function () {
          uploadFile(
            {
              name: `${base}.mp4`,
              mimetype: 'video/mp4',
              buffer: fs.readFileSync(outputFile),
            },
            (error, data) => {
              if (error) throw error;
              res.send(data);
            },
          );
          fs.unlinkSync(inputFile);
          fs.unlinkSync(outputFile);
        })
        .run();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
