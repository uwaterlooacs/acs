import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';

import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const ICON_SIZE = 40;

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(6),
    },
    iconsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginBottom: 0,
      },
    },
    icon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
    },
    button: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
      },
    },
    scContainer: {
      cursor: 'pointer',
    },
    sc: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    snapCodeWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    snapCodeContainer: {
      height: 400,
      [theme.breakpoints.down('sm')]: {
        width: `calc(100% - ${2 * theme.spacing(2)}px)`,
        margin: `0 ${theme.spacing(2)}px`,
        marginTop: theme.spacing(2),
      },
    },
    snapCode: {
      maxHeight: '100%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
  });

function Social({ classes }: WithStyles<typeof styles>) {
  const [isSCHidden, setIsSCHidden] = useState(true);

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography color="textPrimary" variant="h4" align="center">
          Thanks for your feedback!
        </Typography>
        <Typography color="textPrimary" variant="body1" align="center">
          Make sure to follow us on social media:
        </Typography>
      </div>
      <div className={classes.iconsContainer}>
        <Button
          className={classes.button}
          href="https://www.facebook.com/uWaterlooACS"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FacebookIcon className={classes.icon} />
          /uWaterlooACS
        </Button>
        <Button
          className={classes.button}
          href="https://twitter.com/uWaterlooACS"
          target="_blank"
          rel="noreferrer noopener"
        >
          <TwitterIcon className={classes.icon} />
          @uWaterlooACS
        </Button>
      </div>
      <div className={classes.iconsContainer}>
        <Button
          className={classes.button}
          href="https://www.instagram.com/uwaterlooacs"
          target="_blank"
          rel="noreferrer noopener"
        >
          <InstagramIcon className={classes.icon} />
          @uwaterlooacs
        </Button>
        <Button onClick={() => setIsSCHidden(false)} className={classes.button}>
          <div className={classNames(classes.icon, classes.scContainer)}>
            <img
              className={classes.sc}
              src="assets/snapchat-logo.png"
              alt="snapchat"
            />
          </div>
          @uwaterlooacs
        </Button>
      </div>
      {!isSCHidden && (
        <div className={classes.snapCodeWrapper}>
          <div className={classes.snapCodeContainer}>
            <img
              className={classes.snapCode}
              src="assets/snapcode.png"
              alt="snap code"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(Social);
