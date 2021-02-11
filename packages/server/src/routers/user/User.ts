import type { Request, Response, NextFunction } from 'express';
import type { UserDoc } from '@acs/shared';
import type { AuthenticatedRequest } from '../../types/AuthenticatedRequest';

import express from 'express';
import { MEMBERSHIP_STATUS } from '@acs/shared';
import UserModel from '../../models/User';
import auth from '../../middleware/auth';
import { MONGO_ERRORS } from '../../utils/constants';
import routeValidator from './routeValidator';
import validate from '../../middleware/validate';

const router = express.Router();

// sign up
router.post(
  '/signup',
  routeValidator('/signup'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const membershipStatus = req.body.paid
        ? MEMBERSHIP_STATUS.PAID
        : MEMBERSHIP_STATUS.UNPAID;

      const user = new UserModel({ ...req.body, membershipStatus });
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (err) {
      if (err.code === MONGO_ERRORS.DUPLICATE_KEY) {
        return res.status(400).send({
          message: 'User with specified unique fields already exists.',
          duplicateKeys: err.keyValue,
        });
      }
      next(err);
    }
  },
);

// login
router.post('/', async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const user = await UserModel.findByCredentials(id, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to login');
  }
});

// third party authentication
router.post('/thirdPartyAuth', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      const user = new UserModel(req.body);
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } else {
      const verifiedUser = await UserModel.validatePassword(user, password);
      const token = await verifiedUser.generateAuthToken();
      res.send({ user: verifiedUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Unable to login');
  }
});

// logout
router.post(
  '/logout',
  auth(),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user == null) {
        throw new Error();
      }
      req.user.tokens = req.user.tokens.filter((token: string | undefined) => {
        return token !== req.token;
      });
      await req.user.save();
      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },
);

// logout all
router.post(
  '/logoutAll',
  auth(),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user == null) {
        throw new Error();
      }
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },
);

// get me
router.get('/me', auth(), async (req: AuthenticatedRequest, res: Response) => {
  res.send(req.user);
});

// get someone by their id
router.get('/', auth(), async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.id as string);
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send();
  }
});

// get someone by their watiam username
router.get('/watiam', auth(), async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      watIAMUserId: req.query.id as string,
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send();
  }
});

// get avatar
router.get('/:id/picture', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user || !user.picture) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.picture);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// update me
router.patch(
  '/me',
  auth(),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const source = req.body as UserDoc;
      if (!req.user) throw new Error();
      const user = Object.assign(req.user, source);
      await user.save();
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  },
);

// update someone
router.patch('/:id', auth(), async (req: Request, res: Response) => {
  const source = req.body as UserDoc;
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      throw new Error('Could not find user');
    }

    Object.assign(user, source);

    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// delete me
router.delete(
  '/me',
  auth(),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error();
      await req.user.remove();
      res.send(req.user);
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  },
);

// delete someone
router.delete('/:id', auth(), async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user != null) {
      await user.remove();
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default router;
