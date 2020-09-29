import mongoose from 'mongoose';
import { VOTING_STAGE } from '../utils/voting';

interface VotingDoc extends mongoose.Document {
  stage: VOTING_STAGE;
}

export default VotingDoc;
