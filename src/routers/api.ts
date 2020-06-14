import express from 'express';
import { ROUTES } from '../utils/constants';
import userRouter from './user';
import mailingListRouter from './mailingList';

const router = express.Router();

router.use(ROUTES.USER, userRouter);
router.use(ROUTES.MAILING_LIST, mailingListRouter);

export default router;
