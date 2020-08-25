import mongoose from 'mongoose';
import { VOTING_STAGE } from '../types/voting';
import { getStringEnumValues } from '../utils/enum';

const VotingSchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: getStringEnumValues(VOTING_STAGE),
    required: true,
  },
});

VotingSchema.statics.getVotingDoc = async () => {
  let votingDoc = await VotingModel.findOne({});
  if (!votingDoc) {
    votingDoc = await VotingModel.create({ stage: VOTING_STAGE.Closed });
  }
  return votingDoc;
};

interface VotingDoc extends mongoose.Document {
  stage: VOTING_STAGE;
}
interface Voting extends mongoose.Model<VotingDoc> {
  getVotingDoc: () => Promise<VotingDoc>;
}

const VotingModel = mongoose.model<VotingDoc, Voting>('Voting', VotingSchema);

export default VotingModel;
