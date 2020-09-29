import type UserDoc from './user';
import type PositionDoc from './position';

import { Types, Document } from 'mongoose';

interface NominationDoc extends Document {
  position: Types.ObjectId | PositionDoc;
  candidate: Types.ObjectId | UserDoc;
  seconds: Types.Array<Types.ObjectId>;
  video?: string;
  writeUp?: string;
}

export default NominationDoc;
