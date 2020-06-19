import { ModelMetadata } from './model';

export type Credentials = {
  email: string;
  password: string;
};

export type UserData = Omit<Credentials, 'password'> & {
  name: string;
  picture?: string;
  password?: string;
};

export type User = UserData & ModelMetadata;
