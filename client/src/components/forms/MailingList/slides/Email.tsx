import React, { Dispatch, SetStateAction } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  text: {
    color: theme.palette.text.primary
  },
  textField: {
    width: '90%',
    height: 64
  }
});

interface Props extends WithStyles<typeof styles> {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

function Email({ classes, email, setEmail }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography variant="h4" className={classes.text}>
          Join our mailing list!
        </Typography>
        <Typography variant="body1" className={classes.text}>
          Get the latest and greatest updates from ACS
        </Typography>
      </div>
      <TextField
        className={classes.textField}
        value={email}
        type="email"
        onChange={e => setEmail(e.target.value)}
        label="Email"
        variant="outlined"
      />
    </div>
  );
}

export default withStyles(styles)(Email);
