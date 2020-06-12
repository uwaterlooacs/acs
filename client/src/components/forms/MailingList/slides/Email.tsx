import { /*type*/ Dispatch, SetStateAction, Ref } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';

import React, { forwardRef } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
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
    textField: {
      width: '90%',
      height: 64,
    },
  });

interface Props extends WithStyles<typeof styles> {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

function Email({ classes, email, setEmail }: Props, ref: Ref<HTMLDivElement>) {
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
      <TextField
        className={classes.textField}
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        variant="outlined"
      />
    </div>
  );
}

export default withStyles(styles)(forwardRef(Email));
