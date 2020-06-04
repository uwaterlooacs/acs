import { Request } from 'express';
import { UserDoc } from '../models/user';

export interface UserRequest extends Request {
  user?: UserDoc;
  token?: string;
}
