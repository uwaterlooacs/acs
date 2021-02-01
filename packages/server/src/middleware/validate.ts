import type { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

// Middleware to automatically send 442 response with errors on failed validation
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

export default validate;
