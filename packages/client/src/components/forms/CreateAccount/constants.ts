export const PASSWORDS_DONT_MATCH_ERROR =
  'The passwords you entered do not match.';

export const INVALID_PASSWORD_ERROR =
  'Your password must be at least 8 characters long.';

export type CreateAccountError =
  | typeof PASSWORDS_DONT_MATCH_ERROR
  | typeof INVALID_PASSWORD_ERROR;
