import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const ICON_SIZE = 40;

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1)
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  }
});

function Social({ classes }: WithStyles<typeof styles>) {
  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography color="textPrimary" variant="h4">
          Thanks for your feedback!
        </Typography>
        <Typography color="textPrimary" variant="body1">
          {"You're now a part of our mailing list"}
        </Typography>
        <Typography color="textPrimary" variant="body1">
          Make sure to follow us on social media
        </Typography>
      </div>
      <div className={classes.iconsContainer}>
        <Button>
          <FacebookIcon className={classes.icon} />
        </Button>
        <Button>
          <TwitterIcon className={classes.icon} />
        </Button>
        <Button>
          <InstagramIcon className={classes.icon} />
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(Social);
