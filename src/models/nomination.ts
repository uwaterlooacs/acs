import type { UserDoc } from './user';
import type { PositionDoc } from './position';

import { Types, Document, Schema, model } from 'mongoose';
import { ModelRefs } from './types';

export interface NominationDoc extends Document {
  position: Types.ObjectId | PositionDoc;
  candidate: Types.ObjectId | UserDoc;
  seconds: Types.Array<Types.ObjectId>;
  video?: string;
  writeUp?: string;
}

const NominationSchema = new Schema({
  position: {
    type: Types.ObjectId,
    required: true,
    ref: ModelRefs.POSITION,
  },
  candidate: {
    type: Types.ObjectId,
    required: true,
    ref: ModelRefs.USER,
  },
  seconds: [
    {
      type: Types.ObjectId,
      required: true,
    },
  ],
  video: {
    type: String,
    trim: true,
  },
  writeUp: {
    type: String,
    trim: true,
  },
});

const NominationModel = model<NominationDoc>(
  ModelRefs.NOMINATION,
  NominationSchema,
);

export default NominationModel;
