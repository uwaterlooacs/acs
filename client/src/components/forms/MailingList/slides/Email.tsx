import { /*type*/ Dispatch, SetStateAction, Ref } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';

import React, { forwardRef } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import validator from 'validator';
import { TextField, Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
    },
    textFieldContainer: {
      width: '100%',
      height: 74,
    },
    textField: {
      width: '100%',
      height: 64,
    },
  });

interface Props extends WithStyles<typeof styles> {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

function Email({ classes, email, setEmail }: Props, ref: Ref<HTMLDivElement>) {
  const isInvalidEmail = Boolean(email) && !validator.isEmail(email);

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.textContainer}>
        <Typography variant="h4" color="textPrimary">
          Join our mailing list!
        </Typography>
        <Typography variant="body1" color="textPrimary">
          Get the latest and greatest updates from ACS
        </Typography>
      </div>
      <div className={classes.textFieldContainer}>
        <TextField
          className={classes.textField}
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          error={isInvalidEmail}
          helperText={
            isInvalidEmail
              ? 'Enter a valid email address (example@gmail.com)'
              : ''
          }
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(forwardRef(Email));
