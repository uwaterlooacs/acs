import mongoose from 'mongoose';
import { MEMBERSHIP_STATUS } from '../utils/user';

interface UserDoc extends mongoose.Document {
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

export default UserDoc;
