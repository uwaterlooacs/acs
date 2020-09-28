import type { PositionDoc } from '@acs/shared';

import { Types, Schema, model } from 'mongoose';
import { ModelRefs } from './types';

const PositionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  occupant: {
    type: Types.ObjectId,
    required: true,
    ref: ModelRefs.USER,
  },
});

const PositionModel = model<PositionDoc>(ModelRefs.POSITION, PositionSchema);

export default PositionModel;
