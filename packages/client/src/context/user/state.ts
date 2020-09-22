import type { User } from 'types/user';

import { createContext } from 'react';

type UserContextType = {
  user?: User;
  token?: string;
  setUser: (user: User) => void;
  unsetUser: () => void;
  setToken: (token: string) => void;
  unsetToken: () => void;
};

export const initialState = {
  token: localStorage.getItem('token') || undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: User) => {},
  unsetUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: (token: string) => {},
  unsetToken: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);
