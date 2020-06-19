import express, { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import createError from 'http-errors';
import UserModel, { UserDoc } from '../../models/user';
import { UserRequest } from '../../types/network';
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';
import routeValidator from './routeValidator';
import validate from '../../middleware/validate';
import { MEMBERSHIP_STATUS } from '../../types/user';
import { MembershipCheckRequestBody, SignInRequestBody } from './types';

const router = express.Router();

// sign up
router.post(
  '/signup',
  routeValidator('/signup'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signupData = req.body as SignInRequestBody;
      const membershipStatus = signupData.paid
        ? MEMBERSHIP_STATUS.PAID
        : MEMBERSHIP_STATUS.UNPAID;

      const user = new UserModel({ ...signupData, membershipStatus });
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (err) {
      next(err);
    }
  },
);

// login
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(M.LOGIN);
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
    res.status(400).send(M.LOGIN);
  }
});

// logout
router.post('/logout', auth, async (req: UserRequest, res: Response) => {
  try {
    if (req.user == null) {
      throw new Error();
    }
    req.user.tokens = req.user.tokens.filter((token) => {
      return token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// logout all
router.post('/logoutAll', auth, async (req: UserRequest, res: Response) => {
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
});

// get me
router.get('/me', auth, async (req: UserRequest, res: Response) => {
  res.send(req.user);
});

// get someone
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send();
  }
});

// REMOVE THIS ROUTE
// get all users
router.get('/all', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    if (!users) {
      throw new Error('User not found');
    }
    res.send(users);
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
router.patch('/me', auth, async (req: UserRequest, res: Response) => {
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
});

// update someone
router.patch('/:id', auth, async (req: Request, res: Response) => {
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
router.delete('/me', auth, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) throw new Error();
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// delete someone
router.delete('/:id', auth, async (req: Request, res: Response) => {
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

// check membership by email or watiam user id
router.post(
  '/membership-check',
  routeValidator('/membership-check'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { emailOrWatIAMUserId } = req.body as MembershipCheckRequestBody;

      const isEmail = validator.isEmail(emailOrWatIAMUserId);
      const user = await UserModel.findOne(
        { [isEmail ? 'email' : 'watIAMUserId']: emailOrWatIAMUserId },
        'membershipStatus',
      );

      if (user === null) {
        throw createError(
          404,
          `${
            isEmail ? 'Email' : 'WatIAM user id'
          } provided does not match an existing user.`,
        );
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
