const MIN_PASSWORD_LENGTH = 8;
export const isPassword = (password: string) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Password is too short. Minimum length is ${MIN_PASSWORD_LENGTH} characters.`,
    );
  }
  // we can add more password constraints here
  return true;
};
