import { ModelMetadata } from './model';

export enum MEMBERSHIP_STATUS {
  EXPIRED = 'Not currently a Member',
  UNPAID = 'Member has not paid',
  PAID = 'Full Member',
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
