import { User } from './user';

export enum Method {
  GET,
  POST,
  PATCH,
  DELETE
}

export type AuthMode = 'login' | 'signup';

export type AuthResponse = {
  user: User;
  token: string;
};
