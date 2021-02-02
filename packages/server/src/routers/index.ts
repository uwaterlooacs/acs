import express from 'express';
import MailingListRouter from './MailingList';
import MembershipRouter from './Membership';
import NominationRouter from './Nomination';
import VotingRouter from './Voting';
import UserRouter from './User';
import { ROUTES } from '../utils/constants';

const router = express.Router();

router.use(ROUTES.MAILING_LIST, MailingListRouter);
router.use(ROUTES.MEMBERSHIP, MembershipRouter);
router.use(ROUTES.NOMINATION, NominationRouter);
router.use(ROUTES.USER, UserRouter);
router.use(ROUTES.VOTING, VotingRouter);

export default router;
