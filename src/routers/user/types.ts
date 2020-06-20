export type SignInRequestBody = {
  name: string;
  email: string;
  watIAMUserId: string;
  password: string;
  paid?: boolean;
  picture?: string;
};

export type MembershipCheckRequestBody = {
  emailOrWatIAMUserId: string;
};
