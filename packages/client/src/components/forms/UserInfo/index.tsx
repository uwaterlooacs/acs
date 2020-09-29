import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { isStudentNumber, isName, isUWEmail } from '../utils';
import { FACULTIES, SEMESTERS } from 'utils/constants';
import { INPUT_ERRORS } from './constants';

export type FieldValues = {
  firstName: string;
  lastName: string;
  studentNumber: string;
  email: string;
  semester: string;
  faculty: string;
};
export type FieldKeys = keyof FieldValues;

export type FieldSetters = {
  setFirstName: (newValue: string) => void;
  setLastName: (newValue: string) => void;
  setStudentNumber: (newValue: string) => void;
  setEmail: (newValue: string) => void;
  setSemester: (newValue: string) => void;
  setFaculty: (newValue: string) => void;
};

type Props = FieldValues &
  FieldSetters & {
    errors?: Partial<Record<keyof FieldValues, string>>;
    triedToSubmit: boolean;
  };

function UserInfoForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  studentNumber,
  setStudentNumber,
  email,
  setEmail,
  semester,
  setSemester,
  faculty,
  setFaculty,
  errors,
  triedToSubmit,
}: Props) {
  const showFirstNameInputError = triedToSubmit && !isName(firstName);
  const showLastNameInputError = triedToSubmit && !isName(lastName);
  const showStudentNumberInputError =
    triedToSubmit && !isStudentNumber(studentNumber);
  const showEmailInputError = triedToSubmit && !isUWEmail(email);
  const showSemesterInputError = triedToSubmit && !semester;
  const showFacultyInputError = triedToSubmit && !faculty;

  return (
    <>
      <Box display="flex">
        <Box flex={1}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={showFirstNameInputError || !!errors?.firstName}
            helperText={
              showFirstNameInputError
                ? INPUT_ERRORS.FIRST_NAME
                : errors?.firstName
            }
          />
        </Box>
        <Box marginLeft={1} flex={1}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={showLastNameInputError || !!errors?.lastName}
            helperText={
              showLastNameInputError ? INPUT_ERRORS.LAST_NAME : errors?.lastName
            }
          />
        </Box>
      </Box>
      <Box marginTop={2}>
        <TextField
          label="Student Number"
          variant="outlined"
          fullWidth
          type="number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          error={showStudentNumberInputError || !!errors?.studentNumber}
          helperText={
            showStudentNumberInputError
              ? INPUT_ERRORS.STUDENT_NUMBER
              : errors?.studentNumber
          }
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={showEmailInputError || !!errors?.email}
          helperText={showEmailInputError ? INPUT_ERRORS.EMAIL : errors?.email}
        />
      </Box>
      <Box display="flex" marginTop={2}>
        <Box flex={1}>
          <FormControl fullWidth error={showSemesterInputError}>
            <InputLabel id="semester-label" variant="outlined">
              Semester
            </InputLabel>
            <Select
              id="semester"
              labelId="semester-label"
              label="Semester"
              variant="outlined"
              value={semester}
              onChange={(e) => setSemester(e.target.value as string)}
            >
              <MenuItem value={undefined} disabled>
                Select Semester
              </MenuItem>
              {SEMESTERS.map((semesters) => (
                <MenuItem key={semesters} value={semesters}>
                  {semesters}
                </MenuItem>
              ))}
            </Select>
            {(showSemesterInputError || !!errors?.semester) && (
              <FormHelperText>
                {showSemesterInputError
                  ? INPUT_ERRORS.SEMESTER
                  : errors?.semester}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box marginLeft={1} flex={1}>
          <FormControl fullWidth error={showFacultyInputError}>
            <InputLabel id="faculty-label" variant="outlined">
              Faculty
            </InputLabel>
            <Select
              id="faculty"
              labelId="faculty-label"
              label="Faculty"
              variant="outlined"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value as string)}
            >
              <MenuItem value={undefined} disabled>
                Select Faculty
              </MenuItem>
              {FACULTIES.map((faculty) => (
                <MenuItem key={faculty} value={faculty}>
                  {faculty}
                </MenuItem>
              ))}
            </Select>
            {(showFacultyInputError || !!errors?.faculty) && (
              <FormHelperText>
                {showFacultyInputError ? INPUT_ERRORS.FACULTY : errors?.faculty}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>
    </>
  );
}

export default UserInfoForm;
