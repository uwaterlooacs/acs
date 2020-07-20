import validator from 'validator';

const MIN_NAME_LENGTH = 1;
const isAlphaWithSpaces = (str: string) => {
  return str.split(' ').every((substr) => validator.isAlpha(substr));
};
export const isName = (name: string) => {
  if (name.length < MIN_NAME_LENGTH) return false;
  if (!isAlphaWithSpaces(name)) return false;
  return true;
};

export const isStudentNumber = (studentNumber: string) => {
  if (studentNumber.length !== 8) return false;
  if (!validator.isInt(studentNumber)) return false;
  return true;
};

const UW_EMAIL_DOMAIN = 'uwaterloo.ca';
export const isUWEmail = (email: string) => {
  if (!validator.isEmail(email)) return false;
  if (!email.endsWith(`@${UW_EMAIL_DOMAIN}`)) return false;
  return true;
};
