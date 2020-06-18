import { /*type*/ Dispatch, SetStateAction } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import validator from 'validator';
import classNames from 'classnames';
import { TextField, Typography, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const TRANSITION_TIME = '0.5s';

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
      alignItems: 'center',
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
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '100%',
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(4)}px`,
    },
    button: {
      transition: TRANSITION_TIME,
    },
    nextButton: {
      marginBottom: theme.spacing(1),
    },
  });

interface Props extends WithStyles<typeof styles> {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  goRight: () => void;
}

function Email({ classes, email, setEmail, goRight }: Props) {
  const isInvalidEmail = Boolean(email) && !validator.isEmail(email);

  const joinMailingList = () => {
    if (validator.isEmail(email)) {
      goRight();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography variant="h4" color="textPrimary" align="center">
          Join our mailing list!
        </Typography>
        <Typography variant="body1" color="textPrimary" align="center">
          Get the latest and greatest updates from ACS.
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
      <div className={classes.buttonContainer}>
        <Button
          onClick={joinMailingList}
          className={classNames(classes.button, classes.nextButton)}
        >
          Join
          <NavigateNextIcon />
        </Button>
        <Button onClick={goRight} className={classes.button}>
          Skip to event suggestions
          <NavigateNextIcon />
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(Email);
