import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types/Request';

import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

type TokenVerification = {
  id: string;
};

type AuthOptions = {
  isAdmin?: boolean;
};

const auth = ({ isAdmin }: AuthOptions = {}) => async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { APP_SECRET } = process.env;

    const authHeader = req.header('Authorization');
    if (authHeader == null) {
      throw new Error();
    }

    const token = authHeader.replace('Bearer ', '');
    const verification = jwt.verify(
      token,
      APP_SECRET || '',
    ) as TokenVerification;
    const id = verification.id;

    const user = await UserModel.findOne({ _id: id, tokens: token });
    if (!user) {
      throw new Error('Please authenticate');
    }

    if (isAdmin && !user.isAdmin) {
      throw new Error('Admin role is required');
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send(e.message);
  }
};

export default auth;
