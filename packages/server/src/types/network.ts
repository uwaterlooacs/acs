import { Request } from 'express';
import { UserDoc } from '@acs/shared';

export interface AuthenticatedRequest extends Request {
  user?: UserDoc;
  token?: string;
}
