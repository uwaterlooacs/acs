import type { NominationDoc } from '@acs/shared';

import { Types, Schema, model } from 'mongoose';
import { ModelRefs } from '../types';

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
  votes: [
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
