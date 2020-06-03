import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  secret: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  tokens: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

UserSchema.virtual('event', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'owner'
});

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.secret;
  delete userObject.tokens;

  return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id.toString() }, process.env.APP_SECRET);
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
}

UserSchema.statics.validateSecret = async (user: UserDoc, secret: string) => {
  const isMatch = await bcrypt.compare(secret, user.secret);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
}

UserSchema.statics.findByCredentials = async (email: string, secret: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }
  return await UserModel.validateSecret(user, secret);
};

UserSchema.pre('save', async function (next) {
  const user = this as UserDoc;
  if (user.isModified('secret')) {
    user.secret = await bcrypt.hash(user.secret, 8);
  }
  next();
});

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  secret: string;
  picture?: string;
  tokens: string[];
  generateAuthToken: () => Promise<string>;
}

interface User extends mongoose.Model<UserDoc> {
  findByCredentials: (email: string, secret: string) => Promise<UserDoc>;
  validateSecret: (user: UserDoc, secret: string) => Promise<UserDoc>;
}

const UserModel: User = mongoose.model<UserDoc, User>('User', UserSchema);

export default UserModel;
