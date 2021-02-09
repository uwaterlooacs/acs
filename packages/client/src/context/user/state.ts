import type { User } from 'types/user';

import { createContext } from 'react';

export type State = {
  user?: User;
  token?: string;
  setUser: (user: User) => void;
  unsetUser: () => void;
  setToken: (token: string) => void;
  unsetToken: () => void;
};

export const initialState: State = {
  token: localStorage.getItem('token') || undefined,
  setUser: (user: User) => {
    void user;
  },
  unsetUser: () => null,
  setToken: (token: string) => {
    void token;
  },
  unsetToken: () => null,
};

export const UserContext = createContext<State>(initialState);
