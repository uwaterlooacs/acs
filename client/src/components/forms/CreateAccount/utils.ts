const MIN_PASSWORD_LENGTH = 8;
export const isPassword = (password: string) => {
  if (password.length < MIN_PASSWORD_LENGTH) return false;
  // we can add more password constraints here
  return true;
};
