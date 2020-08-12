import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useState, useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Fade, Box, Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import UserInfoForm from 'components/forms/UserInfo';
import BWButton from 'components/buttons/BWButton';
import { isName, isStudentNumber, isUWEmail } from 'components/forms/utils';

const styles = (theme: Theme) =>
  createStyles({
    subtitle: {
      marginTop: theme.spacing(1),
    },
    actions: {
      marginTop: theme.spacing(4),
      padding: `0 ${theme.spacing(4)}px`,
    },
  });

type Props = WithStyles<typeof styles> & {
  onVerify: () => void;
};

function VerifyInfo({ classes, onVerify }: Props) {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [studentNumber, setStudentNumber] = useState(
    user.studentNumber.toString(),
  );
  const [email, setEmail] = useState(user.email);
  const [semester, setSemester] = useState(user.semester);
  const [faculty, setFaculty] = useState(user.faculty);

  const [triedToSubmit, setTriedToSubmit] = useState(false);

  const onSubmit = () => {
    setTriedToSubmit(true);
    if (
      isName(firstName) &&
      isName(lastName) &&
      isStudentNumber(studentNumber) &&
      isUWEmail(email) &&
      !!semester &&
      !!faculty
    ) {
      setUser({
        ...user,
        firstName,
        lastName,
        studentNumber: parseInt(studentNumber),
        email,
        semester,
        faculty,
      });
      onVerify();
    }
  };

  return (
    <div>
      <Fade appear in timeout={800}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" align="center">
            Verify Your Information
          </Typography>
          <div className={classes.subtitle}>
            <Typography variant="h5" align="center">
              Verify that the info below is correct and up to date.
            </Typography>
            <Typography variant="h5" align="center">
              Feel free to make changes if necessary.
            </Typography>
          </div>
        </Box>
      </Fade>
      <Fade appear in timeout={1000}>
        <Box marginTop={6}>
          <UserInfoForm
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
          <div className={classes.actions}>
            <BWButton onClick={onSubmit} fullWidth>
              Submit
            </BWButton>
          </div>
        </Box>
      </Fade>
    </div>
  );
}

export default withStyles(styles)(VerifyInfo);
