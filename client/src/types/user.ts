import { ModelMetadata } from './model';

export enum MEMBERSHIP_STATUS {
  EXPIRED = "You're not currently a member",
  UNPAID = "You're a member! But it looks like you haven't paid for this term",
  PAID = "You're a full member!",
}

export type Credentials = {
  id: string;
  password: string;
};

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  watIAMUserId: string;
  studentNumber: number;
  semester: string;
  faculty: string;
  picture?: string;
  membershipStatus: MEMBERSHIP_STATUS;
  isAdmin: boolean;
  password?: string;
};

export type User = UserData & ModelMetadata;

export type SignUpUserData = Omit<UserData, 'membershipStatus' | 'isAdmin'> & {
  paid?: boolean;
};
