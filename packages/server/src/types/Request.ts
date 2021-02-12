import { Request } from 'express';
import type { UserDoc } from '@acs/shared';

export interface AuthenticatedRequest extends Request {
  user?: UserDoc;
  token?: string;
}

export interface UploadRequest extends AuthenticatedRequest {
  files?: {
    file: {
      name: string;
      data: Buffer;
    };
  };
}
