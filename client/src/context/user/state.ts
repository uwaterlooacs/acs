import { createContext } from 'react';
import { User, MEMBERSHIP_STATUS } from 'types/user';

const userState: User = {
  _id: '0',
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'janed@uwaterloo.ca',
  watIAMUserId: 'janed',
  studentNumber: 0,
  semester: '1A',
  faculty: 'Arts',
  isAdmin: false,
  membershipStatus: MEMBERSHIP_STATUS.EXPIRED,
};

export const initialState = {
  user: userState,
  token: localStorage.getItem('token') || '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: User) => {},
  unsetUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: (token: string) => {},
  unsetToken: () => {},
};

export const UserContext = createContext(initialState);
