import type { VotingDoc } from '@acs/shared';

import mongoose from 'mongoose';
import { VOTING_STAGE, getStringEnumValues } from '@acs/shared';

const VotingSchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: getStringEnumValues(VOTING_STAGE),
    required: true,
  },
});

VotingSchema.statics.getDoc = async () => {
  let votingDoc = await VotingModel.findOne({});
  if (!votingDoc) {
    votingDoc = await VotingModel.create({ stage: VOTING_STAGE.Closed });
  }
  return votingDoc;
};

interface Voting extends mongoose.Model<VotingDoc> {
  getDoc: () => Promise<VotingDoc>;
}

const VotingModel = mongoose.model<VotingDoc, Voting>('Voting', VotingSchema);

export default VotingModel;
