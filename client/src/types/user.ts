import { ModelMetadata } from './model';

export type Credentials = {
  email: string;
  secret: string;
}

export type UserData = Credentials & {
  name: string;
  picture?: string;
  secret?: string;
};

export type User = UserData & ModelMetadata;
