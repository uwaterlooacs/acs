import type { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const ICON_SIZE = 40;

const styles = (theme: Theme) =>
  createStyles({
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
      marginRight: theme.spacing(1),
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

interface Props extends WithStyles<typeof styles> {
  theme?: 'white' | 'black';
}

function SocialIcons({ classes, theme }: Props) {
  const snapchatSrc =
    theme === 'white'
      ? 'assets/snapchat-white.png'
      : 'assets/snapchat-logo.png';

  return (
    <>
      <div className={classes.iconsContainer}>
        <Button
          className={classes.button}
          href="https://www.facebook.com/uWaterlooACS"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: theme }}
        >
          <FacebookIcon className={classes.icon} />
          /uWaterlooACS
        </Button>
        <Button
          className={classes.button}
          href="https://twitter.com/uWaterlooACS"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: theme }}
        >
          <TwitterIcon className={classes.icon} />
          @uWaterlooACS
        </Button>
        <Button
          className={classes.button}
          href="https://linktr.ee/uwaterlooacs"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: theme }}
        >
          <div className={classes.icon}>
            <img
              className={classes.sc}
              src="assets/linktree.png"
              alt="linktree"
            />
          </div>
          /uwaterlooacs
        </Button>
      </div>
      <div className={classes.iconsContainer}>
        <Button
          className={classes.button}
          href="https://www.instagram.com/uwaterlooacs"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: theme }}
        >
          <InstagramIcon className={classes.icon} />
          @uwaterlooacs
        </Button>
        <Button
          className={classes.button}
          href="https://www.snapchat.com/add/uwaterlooacs"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: theme }}
        >
          <div className={classes.icon}>
            <img className={classes.sc} src={snapchatSrc} alt="snapchat" />
          </div>
          @uwaterlooacs
        </Button>
      </div>
    </>
  );
}

export default withStyles(styles)(SocialIcons);
