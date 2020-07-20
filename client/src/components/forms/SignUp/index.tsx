import React from 'react';
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  TextField,
  Box,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import BWButton from 'components/buttons/BWButton';
import { FACULTIES, SEMESTERS } from 'utils/constants';

const styles = (theme: Theme) =>
  createStyles({
    titleDivider: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.text.primary,
    },
    form: {
      marginTop: theme.spacing(2),
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    actions: {
      marginTop: theme.spacing(2),
      padding: `0 ${theme.spacing(4)}px`,
    },
  });

type Props = WithStyles<typeof styles> & {
  firstName: string;
  setFirstName: (newValue: string) => void;
  lastName: string;
  setLastName: (newValue: string) => void;
  studentNumber: string;
  setStudentNumber: (newValue: string) => void;
  email: string;
  setEmail: (newValue: string) => void;
  semester: string;
  setSemester: (newValue: string) => void;
  faculty: string;
  setFaculty: (newValue: string) => void;
  onNext: () => void;
};

function SignUpForm({
  classes,
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
  onNext,
}: Props) {
  return (
    <div>
      <Typography variant="h4" align="center">
        Enter Your Information
      </Typography>
      <Divider className={classes.titleDivider} />
      <div className={classes.form}>
        <Box display="flex">
          <Box flex={1}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box marginLeft={1} flex={1}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Student Number"
            variant="outlined"
            fullWidth
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box display="flex" marginTop={2}>
          <Box flex={1}>
            <FormControl fullWidth>
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
            </FormControl>
          </Box>
          <Box marginLeft={1} flex={1}>
            <FormControl fullWidth>
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
            </FormControl>
          </Box>
        </Box>
      </div>
      <div className={classes.actions}>
        <BWButton onClick={onNext} fullWidth>
          Next
        </BWButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(SignUpForm);
