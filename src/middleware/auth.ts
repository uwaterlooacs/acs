import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/network';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

type TokenVerification = {
  id: string;
};

const auth = async (
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
    const verification = jwt.verify(token, APP_SECRET) as TokenVerification;
    const id = verification.id;
    const user = await UserModel.findOne({ _id: id, tokens: token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send('Please authenticate');
  }
};

export default auth;
