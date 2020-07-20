import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MEMBERSHIP_STATUS, SEMESTERS, FACULTIES } from '../types/user';

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

UserSchema.virtual('event', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id.toString() }, process.env.APP_SECRET);
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

UserSchema.statics.findByCredentials = async (
  email: string,
  password: string,
) => {
  const user = await UserModel.findOne({ email });
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

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture?: string;
  watIAMUserId: string;
  studentNumber: number;
  semester: string;
  faculty: string;
  membershipStatus: MEMBERSHIP_STATUS;
  isAdmin: boolean;
  tokens: string[];
  generateAuthToken: () => Promise<string>;
}

interface User extends mongoose.Model<UserDoc> {
  findByCredentials: (email: string, password: string) => Promise<UserDoc>;
  validatePassword: (user: UserDoc, password: string) => Promise<UserDoc>;
}

const UserModel: User = mongoose.model<UserDoc, User>('User', UserSchema);

export default UserModel;
