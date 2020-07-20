import { ModelMetadata } from './model';

export enum MEMBERSHIP_STATUS {
  EXPIRED = 'Not currently a Member',
  UNPAID = 'Member has not paid',
  PAID = 'Full Member',
}

export type Credentials = {
  email: string;
  password: string;
};

export type UserData = Omit<Credentials, 'password'> & {
  firstName: string;
  lastName: string;
  watIAMUserId: string;
  studentNumber: number;
  picture?: string;
  membershipStatus: MEMBERSHIP_STATUS;
  isAdmin: string;
  password?: string;
};

export type User = UserData & ModelMetadata;

export type SignUpUserData = Omit<
  UserData & Credentials,
  'membershipStatus' | 'isAdmin'
> & {
  paid?: boolean;
};
