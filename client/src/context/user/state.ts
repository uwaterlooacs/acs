import { createContext } from 'react';
import { User } from 'types/user';

export const initialState = {
  user: {
    _id: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Anonymous',
    email: 'a@b.com',
  },
  token: localStorage.getItem('token') || '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: User) => {},
  unsetUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: (token: string) => {},
  unsetToken: () => {},
};

export const UserContext = createContext(initialState);
