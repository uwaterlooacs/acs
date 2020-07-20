import validator from 'validator';

const MIN_PASSWORD_LENGTH = 8;
export const isPassword = (password?: string) => {
  if (!password) {
    throw new Error('password is required.');
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `password is too short. Minimum length is ${MIN_PASSWORD_LENGTH} characters.`,
    );
  }
  // we can add more password constraints here
  return true;
};

const STUDENT_NUMBER_LENGTH = 8;
export const isStudentNumber = (studentNumber?: string) => {
  if (!studentNumber) {
    throw new Error('studentNumber is required.');
  }
  if (studentNumber.length !== STUDENT_NUMBER_LENGTH) {
    throw new Error(
      `studentNumber is must be ${STUDENT_NUMBER_LENGTH} characters in length.`,
    );
  }
  if (!validator.isNumeric(studentNumber)) {
    throw new Error(`studentNumber is must only contain numeric characters.`);
  }
  return true;
};
