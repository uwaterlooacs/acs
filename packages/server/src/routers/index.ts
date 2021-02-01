import express from 'express';
import { ROUTES } from '../utils/constants';
import UserRouter from './User';
import NominationRouter from './Nomination';
import MailingListRouter from './MailingList';
import VotingRouter from './Voting';

const router = express.Router();

router.use(ROUTES.USER, UserRouter);
router.use(ROUTES.NOMINATION, NominationRouter);
router.use(ROUTES.MAILING_LIST, MailingListRouter);
router.use(ROUTES.VOTING, VotingRouter);

export default router;
