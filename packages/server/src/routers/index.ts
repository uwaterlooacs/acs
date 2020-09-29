import express from 'express';
import { ROUTES } from '../utils/constants';
import userRouter from './user';
import nominationRouter from './nomination';
import mailingListRouter from './mailingList';
import devRouter from './dev';
import votingRouter from './voting';

const router = express.Router();

router.use(ROUTES.USER, userRouter);
router.use(ROUTES.NOMINATION, nominationRouter);
router.use(ROUTES.MAILING_LIST, mailingListRouter);
router.use(ROUTES.DEV, devRouter);
router.use(ROUTES.VOTING, votingRouter);

export default router;
