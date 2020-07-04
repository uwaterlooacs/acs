import { Request } from 'express';
import { UserDoc } from '../models/user';

export interface AuthenticatedRequest extends Request {
  user?: UserDoc;
  token?: string;
}
