import React, { useState } from 'react';
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Divider,
} from '@material-ui/core';
import BWButton from 'components/buttons/BWButton';
import { isStudentNumber, isName, isUWEmail } from '../utils';
import UserInfo from '../UserInfo';

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
  const [triedToSubmit, setTriedToSubmit] = useState(false);

  const onNextClicked = () => {
    setTriedToSubmit(true);
    if (
      isName(firstName) &&
      isName(lastName) &&
      isStudentNumber(studentNumber) &&
      isUWEmail(email) &&
      !!semester &&
      !!faculty
    ) {
      onNext();
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Enter Your Information
      </Typography>
      <Divider className={classes.titleDivider} />
      <div className={classes.form}>
        <UserInfo
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          studentNumber={studentNumber}
          setStudentNumber={setStudentNumber}
          email={email}
          setEmail={setEmail}
          semester={semester}
          setSemester={setSemester}
          faculty={faculty}
          setFaculty={setFaculty}
          triedToSubmit={triedToSubmit}
        />
      </div>
      <div className={classes.actions}>
        <BWButton onClick={onNextClicked} fullWidth>
          Next
        </BWButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(SignUpForm);
