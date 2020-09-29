import { SEMESTERS, FACULTIES } from '@acs/shared';

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
export const isStudentNumber = (studentNumber?: number) => {
  if (!studentNumber) {
    throw new Error('studentNumber is required.');
  }
  if (typeof studentNumber !== 'number') {
    throw new Error(`studentNumber must be a number.`);
  }
  if (studentNumber.toString().length !== STUDENT_NUMBER_LENGTH) {
    throw new Error(
      `studentNumber must be ${STUDENT_NUMBER_LENGTH} characters in length.`,
    );
  }
  return true;
};

export const isSemester = (semester?: string) => {
  if (!semester) {
    throw new Error('semester is required.');
  }
  if (!SEMESTERS.includes(semester)) {
    throw new Error(`semester must be one of ${SEMESTERS.join(', ')}.`);
  }
  return true;
};

export const isFaculty = (faculty?: string) => {
  if (!faculty) {
    throw new Error('faculty is required.');
  }
  if (!FACULTIES.includes(faculty)) {
    throw new Error(`faculty must be one of ${FACULTIES.join(', ')}.`);
  }
  return true;
};
