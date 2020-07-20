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
} from '@material-ui/core';
import BWButton from 'components/buttons/BWButton';

const styles = (theme: Theme) =>
  createStyles({
    titleDivider: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.text.primary,
    },
  });

type Props = WithStyles<typeof styles> & {
  email: string;
  password: string;
  setPassword: (newValue: string) => void;
  reenteredPassword: string;
  setReenteredPassword: (newValue: string) => void;
  onNext: () => void;
};

function CreateAccount({
  classes,
  email,
  password,
  setPassword,
  reenteredPassword,
  setReenteredPassword,
  onNext,
}: Props) {
  return (
    <div>
      <Typography variant="h4" align="center">
        Create an Account
      </Typography>
      <Divider className={classes.titleDivider} />
      <Box marginTop={2} paddingY={1} paddingX={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          Choose a password for the account with email:
        </Typography>
        <Typography variant="h6" align="center">
          {email}
        </Typography>
        <Box marginTop={5}>
          <Box marginTop={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box marginTop={2}>
            <TextField
              label="Re-enter Password"
              variant="outlined"
              fullWidth
              type="password"
              value={reenteredPassword}
              onChange={(e) => setReenteredPassword(e.target.value)}
            />
          </Box>
        </Box>
        <Box marginTop={5}>
          <BWButton onClick={onNext} fullWidth>
            Next
          </BWButton>
        </Box>
      </Box>
    </div>
  );
}

export default withStyles(styles)(CreateAccount);
