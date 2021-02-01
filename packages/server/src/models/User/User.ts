import { UserDoc } from '@acs/shared';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SEMESTERS, FACULTIES } from '@acs/shared';
import { ModelRefs } from '../types';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    watIAMUserId: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    studentNumber: {
      unique: true,
      type: Number,
      required: true,
    },
    semester: {
      type: String,
      enum: SEMESTERS,
      required: true,
    },
    faculty: {
      type: String,
      enum: FACULTIES,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    membershipStatus: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tokens: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.virtual('position', {
  ref: ModelRefs.POSITION,
  localField: '_id',
  foreignField: 'occupant',
  justOne: true,
});

UserSchema.virtual('nominations', {
  ref: ModelRefs.NOMINATION,
  localField: '_id',
  foreignField: 'candidate',
});

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { id: this.id.toString() },
    process.env.APP_SECRET || '',
  );
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

UserSchema.statics.validatePassword = async (
  user: UserDoc,
  password: string,
) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

UserSchema.statics.findByCredentials = async (id: string, password: string) => {
  const user = await UserModel.findOne().or([
    { email: id },
    { watIAMUserId: id },
  ]);
  if (!user) {
    throw new Error('Unable to login');
  }
  return await UserModel.validatePassword(user, password);
};

UserSchema.pre('save', async function (next) {
  const user = this as UserDoc;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

interface User extends mongoose.Model<UserDoc> {
  findByCredentials: (id: string, password: string) => Promise<UserDoc>;
  validatePassword: (user: UserDoc, password: string) => Promise<UserDoc>;
}

const UserModel: User = mongoose.model<UserDoc, User>(
  ModelRefs.USER,
  UserSchema,
);

export default UserModel;
