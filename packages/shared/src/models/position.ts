import type UserDoc from './user';

import { Types, Document } from 'mongoose';

interface PositionDoc extends Document {
  title: string;
  description: string;
  isOpen: boolean;
  occupant?: Types.ObjectId | UserDoc;
}

export default PositionDoc;
