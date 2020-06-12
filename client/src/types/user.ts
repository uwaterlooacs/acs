import { ModelMetadata } from './model';

export type Credentials = {
  email: string;
  secret: string;
};

export type UserData = Omit<Credentials, 'secret'> & {
  name: string;
  picture?: string;
  secret?: string;
};

export type User = UserData & ModelMetadata;
